import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockHeroMainTransitionController from "app/component/block/block-hero-main/BlockHeroMainTransitionController";
import IBlockHeroMainOptions from "app/component/block/block-hero-main/IBlockHeroMainOptions";
import BlockHeroMainViewModel from "app/component/block/block-hero-main/BlockHeroMainViewModel";
import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import Promise = require("bluebird");

class BlockHeroMainController extends AbstractBlockComponentController<BlockHeroMainViewModel, IBlockHeroMainOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHeroMain');

	private _imageCrossfader: ImageCrossfaderController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.viewModel.hasStatistics(this.options.slides.map((slide) => slide.statistics !== void 0).indexOf(true) > -1);
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
					this.options.slides[index].background
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
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;

		if(this.viewModel.hasStatistics())
		{
			this._imageCrossfader.setOverlay('rgba(0,48,87,0.5)')
		}
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
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHeroMainTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainController;
