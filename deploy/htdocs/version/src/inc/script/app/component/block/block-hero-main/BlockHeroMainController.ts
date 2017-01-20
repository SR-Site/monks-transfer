import DefaultComponentController from "../DefaultComponentController";
import BlockHeroMainTransitionController from 'app/component/block/block-hero-main/BlockHeroMainTransitionController';
import IBlockHeroMainOptions from 'app/component/block/block-hero-main/IBlockHeroMainOptions';
import BlockHeroMainViewModel from 'app/component/block/block-hero-main/BlockHeroMainViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import KeyCode from "../../../../lib/temple/util/key/KeyCode";
import Promise = require("bluebird");
import DefaultTransitionController from "../../../util/component-transition/DefaultTransitionController";

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
		this.transitionController.addEventListener(DefaultTransitionController.TRANSITION_IN_START, () =>
		{
			// Open the first image
			this.updateBackgroundImage(0)
				.then(() => this.updateBackgroundImage(1));
		});

		super.allComponentsLoaded();
	}


	/**
	 * @public
	 * @method updateBackgroundImage
	 * @param index
	 */
	public updateBackgroundImage(index: number): Promise<any>
	{
		return this._imageCrossfader.open(this.options.slides[index].background.normal);
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

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainController;
