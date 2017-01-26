import DefaultComponentController from "../DefaultComponentController";
import BlockFilterContentTransitionController from "app/component/block/block-filter-content/BlockFilterContentTransitionController";
import IBlockFilterContentOptions from "app/component/block/block-filter-content/IBlockFilterContentOptions";
import BlockFilterContentViewModel from "app/component/block/block-filter-content/BlockFilterContentViewModel";
import Log from "lib/temple/util/Log";
import DataManager from "../../../data/DataManager";
import Promise = require("bluebird");
import BlockHelper from "../../../util/BlockHelper";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import DefaultComponentViewModel from "../DefaultComponentViewModel";
import IBlock from "../../../data/interface/block/IBlock";
import CallbackCounter from "../../../util/CallbackCounter";
import FilterMenuController from "../../filter-menu/FilterMenuController";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import Loader from "../../../util/Loader";

class BlockFilterContentController extends DefaultComponentController<BlockFilterContentViewModel, IBlockFilterContentOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockFilterContent');

	private _limit: number = 4;
	private _offset: number = 0;

	private _components: {[id: string]: DefaultComponentController<DefaultComponentViewModel<any, any>, any>} = {};
	private _filterMenu: FilterMenuController;
	private _filters:{[filterType:string]:string};
	private _loader: Loader;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._loader = new Loader(this.element);

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method handleDynamicComponentLoaded
	 */
	public handleDynamicComponentLoaded(controller: DefaultComponentController<any, any>): void
	{
		this._components[controller.options.id + controller.eventNamespace] = controller;
		this.handleComponentReady(controller);
	}

	/**
	 * @public
	 * @method handleFilterMenuReady
	 */
	public handleFilterMenuReady(controller: FilterMenuController):void
	{
		this._filterMenu = controller;
		this._filterMenu.addEventListener(CommonEvent.CHANGE, this.handleFilterChange.bind(this));
	}

	/**
	 * @private
	 * @method handleFilterChange
	 */
	private handleFilterChange(event:DataEvent<{[filterType:string]:string}>):void
	{
		console.log('handleFilterChange: ', event.data);

		// Save Selected Filters
		this._filters = event.data;

		// Remove components from scrollTrackerPoint in DefaultContentPageController
		this.parentPage.removeComponentsFromScrollTracker(this._components);

		// Empty offset && items
		this._offset = 0;
		this._components = {};
		this.viewModel.items([]);

		// Fetch New Content
		this.loadMore();
	}

	/**
	 * @public
	 * @method allDynamicComponentsLoaded
	 */
	public allDynamicComponentsLoaded(): void
	{
		// Add components to scrollTrackerPoint in DefaultContentPageController
		this.parentPage.addComponentsToScrollTracker(this._components);

		// Dispatch Resize event for Parent Page.
		this.dispatch(CommonEvent.RESIZE);
	}

	/**
	 * @public
	 * @method loadMore
	 */
	public loadMore(): void
	{
		this._offset = this._offset + this._limit;

		this.fetchContent();
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
	 * @method fetchContent
	 */
	private fetchContent(): void
	{
		this._loader.show();

		DataManager.getInstance().serviceModel.contentService.loadMore(
			this.options.endpoint,
			this._offset,
			this._limit,
			this._filters
		).then((result) => this._loader.hide()
			.then(() =>this.handleContentLoad(result.data)));
	}

	/**
	 * @private
	 * @method handleContentLoad
	 */
	private handleContentLoad(result: {blocks: Array<IBlock>}): void
	{
		this.callbackCounter.destruct();
		this.callbackCounter = new CallbackCounter();

		BlockHelper.parseBlocks([], result.blocks).forEach((item) =>
		{
			this.viewModel.items.push(item);
		});

		const allComponentsLoaded: Promise<any> = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();
		allComponentsLoaded.then(() => this.allDynamicComponentsLoaded());
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._limit = null;
		this._offset = null;
		this._components = null;
		this._filterMenu = null;
		this._loader = null;


		// always call this last
		super.destruct();
	}
}

export default BlockFilterContentController;
