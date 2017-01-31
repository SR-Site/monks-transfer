import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockPersonaSelectorTransitionController from 'app/component/block/block-persona-selector/BlockPersonaSelectorTransitionController';
import IBlockPersonaSelectorOptions from 'app/component/block/block-persona-selector/IBlockPersonaSelectorOptions';
import BlockPersonaSelectorViewModel from 'app/component/block/block-persona-selector/BlockPersonaSelectorViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import Promise = require("bluebird");
import InfiniteImageCarousel from "../../../util/infinite-carousel/InfiniteImageCarousel";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import CarouselEvent from "../../../util/infinite-carousel/event/CarouselEvent";
import PaginatorDashedController from "../../paginator-dashed/PaginatorDashedController";

class BlockPersonaSelectorController extends AbstractBlockComponentController<BlockPersonaSelectorViewModel, IBlockPersonaSelectorOptions>
{
	public transitionController: BlockPersonaSelectorTransitionController;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockPersonaSelector');

	private _imageCrossfader: ImageCrossfaderController;
	private _infiniteImageCarousel: InfiniteImageCarousel;
	private _paginatorDashedController: PaginatorDashedController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this._infiniteImageCarousel = new InfiniteImageCarousel(
			<HTMLElement>this.element.querySelector('.js-image-carousel')
		);

		this.applyThreeWayBinding(this._infiniteImageCarousel.realCurrentPage, this.viewModel.activeIndex);

		this._infiniteImageCarousel.addEventListener(CarouselEvent.CHANGE, this.handleImageCarouselChange.bind(this))
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
	 * @method handlePaginatorReady
	 */
	public handlePaginatorReady(controller: PaginatorDashedController): void
	{
		this._paginatorDashedController = controller;

		controller.addEventListener(CarouselEvent.OPEN, (event: DataEvent<{index: number}>) => this.openIndex(event.data.index));
	}

	/**
	 * @public
	 * @method get activeIndex
	 * @returns {any|any<number>}
	 */
	public get activeIndex(): number
	{
		return this.viewModel.activeIndex();
	}

	/**
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;

		// Open the first image
		this.changeBackgroundImage(this.viewModel.activeIndex());
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
					this.options.personas[index].image
				)
			);
		}
		else
		{
			return Promise.resolve();
		}
	}

	/**
	 * @public
	 * @method transitionInSlideContent
	 */
	public transitionInSlideContent(index: number): Promise<any>
	{
		const oldIndex = this.viewModel.activeIndex();

		// Do some transitioning
		return this.transitionController.transitionOutStep(oldIndex)
			.then(() => this.transitionController.transitionInStep(index))
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockPersonaSelectorTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method handleImageCarouselChange
	 */
	private handleImageCarouselChange(event: DataEvent<{index: number}>): void
	{
		this._infiniteImageCarousel.disableInteraction();

		this.transitionInSlideContent(event.data.index)
			.then(() => this._infiniteImageCarousel.enableInteraction());
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._imageCrossfader = null;
		this._paginatorDashedController = null;

		if(this._infiniteImageCarousel)
		{
			this._infiniteImageCarousel.destruct();
			this._infiniteImageCarousel = null;
		}

		// always call this last
		super.destruct();
	}
}

export default BlockPersonaSelectorController;
