import DefaultComponentController from "../DefaultComponentController";
import BlockHeroSecondaryTransitionController from 'app/component/block/block-hero-secondary/BlockHeroSecondaryTransitionController';
import IBlockHeroSecondaryOptions from 'app/component/block/block-hero-secondary/IBlockHeroSecondaryOptions';
import BlockHeroSecondaryViewModel from 'app/component/block/block-hero-secondary/BlockHeroSecondaryViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import DefaultTransitionController from "../../../util/component-transition/DefaultTransitionController";
import ImageHelper from "../../../util/ImageHelper";

class BlockHeroSecondaryController extends DefaultComponentController<BlockHeroSecondaryViewModel, IBlockHeroSecondaryOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHeroSecondary');

	private _imageCrossfader: ImageCrossfaderController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHeroSecondaryTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @public
	 * @method changeBackgroundImage
	 */
	public changeBackgroundImage(): void
	{
		if(this._imageCrossfader)
		{
			// Open the first image
			this._imageCrossfader.open(
				ImageHelper.getImageForMediaQuery(this.options.background)
			)
		}
	}

	/**
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._imageCrossfader = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroSecondaryController;
