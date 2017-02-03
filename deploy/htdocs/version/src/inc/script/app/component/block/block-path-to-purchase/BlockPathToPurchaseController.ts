import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockPathToPurchaseTransitionController from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseTransitionController';
import IBlockPathToPurchaseOptions from 'app/component/block/block-path-to-purchase/IBlockPathToPurchaseOptions';
import BlockPathToPurchaseViewModel from 'app/component/block/block-path-to-purchase/BlockPathToPurchaseViewModel';

import Log from "lib/temple/util/Log";
import InfiniteImageCarousel from "../../../util/infinite-carousel/InfiniteImageCarousel";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import Promise = require("bluebird");
import PaginatorDashedController from "../../paginator-dashed/PaginatorDashedController";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import CarouselEvent from "../../../util/infinite-carousel/event/CarouselEvent";

class BlockPathToPurchaseController extends AbstractBlockComponentController<BlockPathToPurchaseViewModel, IBlockPathToPurchaseOptions>
{
	private _infiniteImageCarousel: InfiniteImageCarousel;
	private _imageCrossfader: ImageCrossfaderController;
	private _paginatorDashedController: PaginatorDashedController;


	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockPathToPurchase');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this.destructibles.addKOSubscription(DataManager.getInstance().deviceStateTracker.currentState.subscribe(this.handleDeviceStateChange.bind(this)));

		this.handleDeviceStateChange(DataManager.getInstance().deviceStateTracker.currentState());

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method handlePaginatorReady
	 */
	public handlePaginatorReady(controller: PaginatorDashedController): void
	{
		this._paginatorDashedController = controller;
		controller.addEventListener(CarouselEvent.OPEN, (event: DataEvent<{index: number}>) => this.openIndex(event.data.index));
	}

	/**
	 * @public
	 * @method openIndex
	 * @param index
	 */
	public openIndex(index: number): void
	{
		this._infiniteImageCarousel.open(index);
	}


	/**
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;

		this.changeBackgroundImage(0);
	}

	/**
	 * @public
	 * @method changeBackgroundImage
	 * @param index
	 */
	public changeBackgroundImage(index: number): Promise<any>
	{
		if(this._imageCrossfader)
		{
			return this._imageCrossfader.open(
				ImageHelper.getImageForMediaQuery(
					this.options.steps[index].background
				)
			);
		}
		else
		{
			return Promise.resolve();
		}
	}

	/**
	 * @private
	 * @method handleDeviceStateChange
	 */
	private handleDeviceStateChange(state: DeviceState): void
	{
		if(state < DeviceState.MEDIUM)
		{
			this.initCarousel();
		}
		else
		{
			this.destructCarousel();
		}
	}

	/**
	 * @private
	 * @method destructCarousel
	 */
	private destructCarousel(): void
	{
		if(this._infiniteImageCarousel)
		{
			this._infiniteImageCarousel.destruct();
			this._infiniteImageCarousel = null;
		}
	}

	/**
	 * @private
	 * @method initCarousel
	 */
	private initCarousel(): void
	{
		if(this._infiniteImageCarousel)
		{
			return;
		}

		this._infiniteImageCarousel = new InfiniteImageCarousel(
			<HTMLElement>this.element.querySelector('.js-image-carousel')
		);

		this.applyThreeWayBinding(this._infiniteImageCarousel.realCurrentPage, this.viewModel.activeIndex);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockPathToPurchaseTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._infiniteImageCarousel)
		{
			this._infiniteImageCarousel.destruct();
			this._infiniteImageCarousel = null;
		}

		this._paginatorDashedController = null;
		this._imageCrossfader = null;

		// always call this last
		super.destruct();
	}
}

export default BlockPathToPurchaseController;
