import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockFilterContentTransitionController from "app/component/block/block-filter-content/BlockFilterContentTransitionController";
import IBlockFilterContentOptions from "app/component/block/block-filter-content/IBlockFilterContentOptions";
import BlockFilterContentViewModel from "app/component/block/block-filter-content/BlockFilterContentViewModel";
import Log from "lib/temple/util/Log";
import DataManager from "../../../data/DataManager";
import Promise = require("bluebird");
import BlockHelper from "../../../util/BlockHelper";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import IBlock from "../../../data/interface/block/IBlock";
import CallbackCounter from "../../../util/CallbackCounter";
import FilterMenuController from "../../filter-menu/FilterMenuController";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import Loader from "../../../util/Loader";
import PaginatorDashedController from "../../paginator-dashed/PaginatorDashedController";
import CarouselEvent from "../../../util/infinite-carousel/event/CarouselEvent";
import IGatewayResult from "../../../net/gateway/result/IGatewayResult";

class BlockFilterContentController extends AbstractBlockComponentController<BlockFilterContentViewModel, IBlockFilterContentOptions, BlockFilterContentTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockFilterContent');

	private _components: {[id: string]: AbstractBlockComponentController<any, any, any>} = {};
	private _filterMenu: FilterMenuController;
	private _filters: {[filterType: string]: string};
	private _loader: Loader;
	private _paginator: PaginatorDashedController;


	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._loader = new Loader(this.element);
	}

	/**
	 * @public
	 * @method handleDynamicComponentLoaded
	 */
	public handleDynamicComponentLoaded(controller: AbstractBlockComponentController<any, any, any>): void
	{
		this._components[controller.options.id + controller.eventNamespace] = controller;

		this.handleComponentReady(controller);
	}

	/**
	 * @public
	 * @method handleFilterMenuReady
	 */
	public handleFilterMenuReady(controller: FilterMenuController): void
	{
		this._filterMenu = controller;
		this._filterMenu.addEventListener(CommonEvent.CHANGE, this.handleFilterChange.bind(this));
	}

	/**
	 * @public
	 * @method handlePaginatorReady
	 */
	public handlePaginatorReady(controller: PaginatorDashedController): void
	{
		this._paginator = controller;
		this._paginator.addEventListener(CarouselEvent.OPEN, (event: DataEvent<{index: number}>) => this.loadPage(event.data.index));
	}

	/**
	 * @private
	 * @method handleFilterChange
	 */
	private handleFilterChange(event: DataEvent<{[filterType: string]: string}>): void
	{
		// Save Selected Filters
		this._filters = event.data;

		// Remove components from scrollTrackerPoint in DefaultContentPageController
		this.removeComponents();

		// Empty offset && items
		this.viewModel.offset = 0;
		this.viewModel.items([]);

		// Reset pages
		this.viewModel.pages([]);

		// Reset ActivePageIndex
		this.viewModel.activePageIndex(0);

		// Fetch New Content
		this.loadPage();
	}

	/**
	 * @private
	 * @method removeComponents
	 */
	private removeComponents(): void
	{
		// Remove components from scrollTrackerPoint in DefaultContentPageController
		this.parentPage.removeComponentsFromScrollTracker(this._components);

		this._components = {};
	}

	/**
	 * @public
	 * @method allDynamicComponentsLoaded
	 */
	public allDynamicComponentsLoaded(): void
	{
		this.afterContentRender();

		// Add components to scrollTrackerPoint in DefaultContentPageController
		this.parentPage.addComponentsToScrollTracker(this._components);

		// Dispatch Resize event for Parent Page.
		this.dispatch(CommonEvent.RESIZE);
	}


	/**
	 * @public
	 * @method loadPage
	 */
	public loadPage(index: number = this.viewModel.activePageIndex()): void
	{
		this.viewModel.offset = index * this.viewModel.limit;

		this.beforeContentLoad().then(() =>
		{
			// Remove component from pagePage/scrollTracker if we do render/show all loaded items in the DOM.
			if(this.viewModel.showInPages())
			{
				this.removeComponents();
			}

			// If we already have this page in Storage, load from storage, if not fetch new content.
			this.fetchPageFromStorage().catch(() => this.fetchContent());
		});

	}

	/**
	 * @private
	 * @method canFetchPageFromStorage
	 */
	private fetchPageFromStorage(): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{

			const pageFound = this.viewModel.pages().find((page) => page.pageIndex === this.getPageIndexByOffset());

			if(pageFound)
			{

				// Destruct and recreate new CallbackCounter to be used for the new blocks that are loaded.
				this.recreateCallbackCounter();

				// Save activePageIndex
				this.setActivePageIndex(this.getPageIndexByOffset(this.viewModel.offset));

				// Once all loaded blocks are ready, register them in the DefaultContentPageController.
				this.addCallbackCounterCompleteListener();

				this._loader.hide();

				resolve();
			}
			else
			{
				reject();
			}
		});
	}

	/**
	 * @public
	 * @method loadMore
	 */
	public loadMore(): void
	{
		this.viewModel.offset = this.viewModel.offset + this.viewModel.limit;

		this.beforeContentLoad().then(() => this.fetchContent());
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockFilterContentTransitionController(this.element, this);

		// Load on init
		this.fetchContent();

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method getPageIndexByOffset
	 */
	private getPageIndexByOffset(offset: number = this.viewModel.offset): number
	{
		return offset / this.viewModel.limit
	}

	/**
	 * @private
	 * @method fetchContent
	 */
	private fetchContent(): void
	{
		DataManager.getInstance().serviceModel.contentService.loadMore(
			this.options.endpoint,
			this.viewModel.offset,
			this.viewModel.limit,
			this._filters
		).then((result) => this.handleContentLoad(result));
		// .then(() => ));
	}


	/**
	 * @private
	 * @method handleContentLoad
	 */
	private handleContentLoad(result: IGatewayResult<{blocks: Array<IBlock>}>): void
	{
		// Save Amount of totalPages in a Array for the PaginatorController.
		this.viewModel.totalPages(Math.ceil(result.pagination.total / this.viewModel.limit));

		// Destruct and recreate new CallbackCounter to be used for the new blocks that are loaded.
		this.recreateCallbackCounter();

		// Save activePageIndex
		this.setActivePageIndex(this.getPageIndexByOffset(this.viewModel.offset));

		let newPageItems = [];

		// Check if it's a valid blockComponent and format as needed for a blockComponent
		BlockHelper.parseBlocks([], result.data.blocks).forEach((item) =>
		{
			this.viewModel.items.push(item);
			newPageItems.push(item);
		});

		// Sore new fetched items in pages.
		this.viewModel.pages.push({
			items: newPageItems,
			pageIndex: this.viewModel.activePageIndex()
		});

		// Once all loaded blocks are ready, register them in the DefaultContentPageController.
		this.addCallbackCounterCompleteListener();
	}

	/**
	 * @private
	 * @method recreateCallbackCounter
	 */
	private recreateCallbackCounter(): void
	{
		// Destruct and recreate new CallbackCounter to be used for the new blocks that are loaded.
		this.callbackCounter.destruct();
		this.callbackCounter = new CallbackCounter();
	}

	/**
	 * @private
	 * @method addCallbackCounterComplete
	 */
	private addCallbackCounterCompleteListener(): void
	{
		// Once all loaded blocks are ready, register them in the DefaultContentPageController.
		const allComponentsLoaded: Promise<any> = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

		// NOTE: if we subscribe to the allcomponents loaded right away this then will be triggered first which means
		// they will be added to the scroll tracker before the setup transition is called, therefore we add an extra subscription
		// to the sub-component callback counters to make sure this one is always at the end of the call stack, this
		// felt a bit more secure then adding a setTimeout(()=> this.allDynamicComponentsLoaded(), 0) in case there will be more nesting
		allComponentsLoaded
			.then(() =>
			{
				return Promise.all(Object.keys(this._components).map((key) => this._components[key].callbackCounter.promise));
			})
			.then(() =>
			{
				this.allDynamicComponentsLoaded()
			})
	}

	/**
	 * @private
	 * @method setActivePageIndex
	 */
	private setActivePageIndex(index: number): void
	{
		this.viewModel.activePageIndex(index);
	}

	/**
	 * @private
	 * @method beforeContentLoad
	 */
	private beforeContentLoad(): Promise<any>
	{
		let contentItems = <HTMLElement>this.element.querySelector('.content-items');

		if(this.viewModel.showInPages())
		{
			return new Promise((resolve: () => void) =>
			{
				TweenLite.to(contentItems, 0.2, {
					opacity: 0,
					height: contentItems.offsetHeight,
					onComplete: resolve
				});
			})
		}
		else
		{
			return Promise.resolve();
		}
	}

	/**
	 * @private
	 * @method afterContentRender
	 */
	private afterContentRender(): void
	{
		TweenLite.set(this.element.querySelector('.content-items'), {clearProps: 'height', opacity: 1});
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._components = null;
		this._filterMenu = null;
		this._loader = null;


		// always call this last
		super.destruct();
	}
}

export default BlockFilterContentController;
