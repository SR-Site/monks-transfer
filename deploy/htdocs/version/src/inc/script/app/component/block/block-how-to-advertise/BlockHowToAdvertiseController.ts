import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockHowToAdvertiseTransitionController from "app/component/block/block-how-to-advertise/BlockHowToAdvertiseTransitionController";
import IBlockHowToAdvertiseOptions from "app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions";
import BlockHowToAdvertiseViewModel from "app/component/block/block-how-to-advertise/BlockHowToAdvertiseViewModel";
import Log from "lib/temple/util/Log";
import {IDraggableEventData} from "../../../util/DraggableInstance";
import ScrollBarController from "../../scroll-bar/ScrollBarController";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import DataEvent from "../../../../lib/temple/event/DataEvent";

class BlockHowToAdvertiseController extends AbstractBlockComponentController<BlockHowToAdvertiseViewModel, IBlockHowToAdvertiseOptions>
{
	public transitionController: BlockHowToAdvertiseTransitionController;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHowToAdvertise');


	private _openStepAnimationProgress: number = 0;
	private _scrollBarController: ScrollBarController;

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
		const stepWrapper = <HTMLElement>this.element.querySelector('.steps-viewport');
		const snapSteps = stepWrapper.offsetWidth / this.options.steps.length;

		this._scrollBarController.setSnapPosition(snapSteps);

		this.transitionController = new BlockHowToAdvertiseTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @public
	 * @method openStep
	 */
	public openStep(index: number): void
	{
		TweenLite.fromTo(this, 0.8,
			{
				_openStepAnimationProgress: this.transitionController.getHowToAdvertiseProgress()
			},
			{
				_openStepAnimationProgress: index / (this.options.steps.length - 1),
				ease: Quad.easeInOut,
				onUpdate: () =>
				{
					this.transitionController.seekHowToAdvertiseTimeline(this._openStepAnimationProgress);
					this._scrollBarController.progress = this._openStepAnimationProgress;
				}
			}
		)
	}

	/**
	 * @public
	 * @method handleScrollBarReady
	 */
	public handleScrollBarReady(controller: ScrollBarController): void
	{
		this._scrollBarController = controller;
		this._scrollBarController.addEventListener(CommonEvent.UPDATE, this.handleScrollBarUpdate.bind(this));
	}

	/**
	 * @private
	 * @method handleScrollBarUpdate
	 * @param event
	 */
	private handleScrollBarUpdate(event: DataEvent<IDraggableEventData>): void
	{
		this.transitionController.seekHowToAdvertiseTimeline(event.data.progress);

	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */

	public destruct(): void
	{
		this._scrollBarController = null;


		// always call this last
		super.destruct();
	}
}

export default BlockHowToAdvertiseController;
