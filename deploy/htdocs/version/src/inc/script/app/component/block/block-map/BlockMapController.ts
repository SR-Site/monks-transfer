import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMapTransitionController from "app/component/block/block-map/BlockMapTransitionController";
import IBlockMapOptions from "app/component/block/block-map/IBlockMapOptions";
import BlockMapViewModel from "app/component/block/block-map/BlockMapViewModel";
import Log from "lib/temple/util/Log";
import ImageSequenceController from "../../image-sequence/ImageSequenceController";
import MapSliderController from "../../map-slider/MapSliderController";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import DataEvent from "../../../../lib/temple/event/DataEvent";

class BlockMapController extends AbstractBlockComponentController<BlockMapViewModel, IBlockMapOptions, BlockMapTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMap');

	private _imageSequence: ImageSequenceController;

	constructor(element: HTMLElement, options: IBlockMapOptions)
	{
		// TODO: for release this data will be static since we need to figure out a way to manage image sequence entities in the CMS
		super(element, Object.assign(options, {
			"sequenceBackground": null,
			"imageSequence": {
				"image": {
					"normal": "data/sequence/map/desktop/map_lines_",
					"small": "data/sequence/map/mobile/map_lines_mobile_",
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
		this._imageSequence = controller;
	}

	/**
	 * @public
	 * @method handleMapSliderReady
	 */
	public handleMapSliderReady(controller: MapSliderController): void
	{
		controller.addEventListener(CommonEvent.UPDATE, this.handleMapSliderProgressChange.bind(this));

		this.applyThreeWayBinding(controller.activeIndex, this.viewModel.activeIndex);
	}


	/**
	 * @private
	 * @method progressToFrameNumber
	 */
	private progressToFrameNumber(progress: number): number
	{
		return Math.round((this.options.imageSequence.total - 1) * progress);
	}

	/**
	 * @private
	 * @method handleMapSliderProgressChange
	 */
	private handleMapSliderProgressChange(event: DataEvent<{progress: number}>): void
	{
		this._imageSequence.seek(
			this.progressToFrameNumber(event.data.progress)
		);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockMapTransitionController(this.element, this);

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

export default BlockMapController;
