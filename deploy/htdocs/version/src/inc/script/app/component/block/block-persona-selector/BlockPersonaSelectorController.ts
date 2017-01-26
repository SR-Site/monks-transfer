import DefaultComponentController from "../DefaultComponentController";
import BlockPersonaSelectorTransitionController from 'app/component/block/block-persona-selector/BlockPersonaSelectorTransitionController';
import IBlockPersonaSelectorOptions from 'app/component/block/block-persona-selector/IBlockPersonaSelectorOptions';
import BlockPersonaSelectorViewModel from 'app/component/block/block-persona-selector/BlockPersonaSelectorViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import Promise = require("bluebird");

class BlockPersonaSelectorController extends DefaultComponentController<BlockPersonaSelectorViewModel, IBlockPersonaSelectorOptions>
{
	protected transitionController:BlockPersonaSelectorTransitionController;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockPersonaSelector');

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
	 * @public
	 * @method get activeIndex
	 * @returns {any|any<number>}
	 */
	public get activeIndex():number
	{
		return this.viewModel.activeIndex();
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
	public changeBackgroundImage(index: number): void
	{
		this._imageCrossfader.open(
			ImageHelper.getImageForMediaQuery(
				this.options.personas[index].image
			)
		);
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

export default BlockPersonaSelectorController;
