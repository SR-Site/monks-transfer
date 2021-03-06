import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMapSecondaryTransitionController from 'app/component/block/block-map-secondary/BlockMapSecondaryTransitionController';
import IBlockMapSecondaryOptions from 'app/component/block/block-map-secondary/IBlockMapSecondaryOptions';
import BlockMapSecondaryViewModel from 'app/component/block/block-map-secondary/BlockMapSecondaryViewModel';

import Log from "lib/temple/util/Log";
import ImageSequenceController from "../../image-sequence/ImageSequenceController";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import DataEvent from "../../../../lib/temple/event/DataEvent";

class BlockMapSecondaryController extends AbstractBlockComponentController<BlockMapSecondaryViewModel, IBlockMapSecondaryOptions, BlockMapSecondaryTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMapSecondary');

	private _imageSequenceController: ImageSequenceController;

	constructor(element: HTMLElement, options: IBlockMapSecondaryOptions)
	{
		// TODO: for release this data will be static since we need to figure out a way to manage image sequence entities in the CMS
		super(element, Object.assign(options, {
			"sequenceBackground": null,
			"imageSequence": {
				"image": {
					"normal": "data/sequence/map-secondary/desktop/map_lines_",
					"small": "data/sequence/map-secondary/mobile/map_lines_mobile_",
					"alt": "Image sequence"
				},
				"extension": ".png",
				"total": 75
			}
		}));
	}

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
	 * @method handleImageSequenceReady
	 */
	public handleImageSequenceReady(controller: ImageSequenceController): void
	{
		this._imageSequenceController = controller;

		controller.addEventListener(CommonEvent.LOADED, this.handleImageSequenceLoaded.bind(this));
		controller.addEventListener(CommonEvent.UPDATE, this.handleImageSequenceUpdate.bind(this));

	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockMapSecondaryTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method handleImageSequenceLoaded
	 */
	private handleImageSequenceLoaded(): void
	{
		this._imageSequenceController.play(true, 2000);
	}

	/**
	 * @private
	 * @method handleImageSequenceUpdate
	 * @param event
	 */
	private handleImageSequenceUpdate(event: DataEvent<{progress: number}>): void
	{
		this.viewModel.sequenceProgress(event.data.progress);
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

export default BlockMapSecondaryController;
