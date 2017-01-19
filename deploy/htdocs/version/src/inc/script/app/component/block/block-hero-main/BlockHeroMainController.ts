import DefaultComponentController from "../DefaultComponentController";
import BlockHeroMainTransitionController from 'app/component/block/block-hero-main/BlockHeroMainTransitionController';
import IBlockHeroMainOptions from 'app/component/block/block-hero-main/IBlockHeroMainOptions';
import BlockHeroMainViewModel from 'app/component/block/block-hero-main/BlockHeroMainViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";

class BlockHeroMainController extends DefaultComponentController<BlockHeroMainViewModel, IBlockHeroMainOptions>
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
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;


		this._imageCrossfader.open();

		setTimeout(() =>
		{
			this._imageCrossfader.open('data/image/hero-main/slide-2.jpg');
		}, 3000);
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
