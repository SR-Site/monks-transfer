import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMapTransitionController from "app/component/block/block-map/BlockMapTransitionController";
import IBlockMapOptions from "app/component/block/block-map/IBlockMapOptions";
import BlockMapViewModel from "app/component/block/block-map/BlockMapViewModel";
import Log from "lib/temple/util/Log";
import ImageSequenceController from "../../image-sequence/ImageSequenceController";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import AbstractTransitionComponentController from "../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import MapPaginationController from "../../map-pagination/MapPaginationController";

class BlockMapController extends AbstractBlockComponentController<BlockMapViewModel, IBlockMapOptions, BlockMapTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMap');

	private _slides: {[index: string]: AbstractTransitionComponentController<any, any, any>} = {};
	private _pagination: MapPaginationController;
	private _imageSequence: ImageSequenceController;

	constructor(element: HTMLElement, options: IBlockMapOptions)
	{
		// TODO: for release this data will be static since we need to figure out a way to manage image sequence entities in the CMS
		super(element, Object.assign(options, {
			"sequenceBackground": {
				"normal": "data/sequence/map/desktop/map_bg.png",
				"small": "data/sequence/map/mobile/map_bg_mobile.png",
				"alt": "Background image"
			},
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

		this.viewModel.slides(this.options.steps);

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method get activeSlide
	 * @returns {any<number>}
	 */
	public get activeSlide(): AbstractTransitionComponentController<any, any, any>
	{
		return this._slides[this.viewModel.activeSlide()];
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
	public handleMapPaginationReady(controller: MapPaginationController): void
	{
		this._pagination = controller;
		this._pagination.addEventListener(
			MapPaginationController.SELECT_INDEX,
			(event: DataEvent<{index: number}>) => this.openSlide(event.data.index)
		);
	}

	/**
	 * @public
	 * @method handleSlideReady
	 */
	public handleSlideReady(index: number, controller: AbstractTransitionComponentController<any, any, any>): void
	{
		// Store the slide reference
		this._slides[index] = controller;
	}

	/**
	 * @private
	 * @method openSlide
	 */
	private openSlide(index: number): void
	{
		const stepCount = this.options.steps.length - 1;
		const currentProgress = this.viewModel.activeSlide() / stepCount;
		const targetProgress = index / stepCount;

		this._slides[this.viewModel.activeSlide()].transitionOut()
			.then(() => this._imageSequence.playFromTo(
				this.progressToFrameNumber(currentProgress),
				this.progressToFrameNumber(targetProgress)
			))
			.then(() => this._slides[index].transitionIn())
			.then(() => this.viewModel.activeSlide(index))
			.then(() => this._pagination.transitionInProgress = false);
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
