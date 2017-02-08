import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockPathToPurchaseController from "./BlockPathToPurchaseController";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";
import Promise = require("bluebird");

class BlockPathToPurchaseTransitionController extends AbstractTransitionController<BlockPathToPurchaseController>
{
	private _slideTransitions: Array<{timeline: TimelineLite, completeMethod: () => void}> = [];

	/**
	 * @public
	 * @method setupTransitionTimeline
	 * @description This method will be used for setting up the timeline for the component
	 */
	public setupTransitionTimeline(): void
	{
		this.setupSlideTransition();

		super.setupTransitionTimeline();
	}

	/**
	 * @private
	 * @method setupSlideTransition
	 */
	private setupSlideTransition(): void
	{
		const slideContent = Array.prototype.slice.call(this.element.querySelectorAll('.slide-detail'));

		this.parentController.options.steps.forEach((slide, index: number) =>
		{
			let element = slideContent[index];
			let heading = element.querySelector('.heading');
			let copy = element.querySelector('.copy');

			let timeline = new TimelineLite({
				paused: true,
				onComplete: () => this.handleSlideTransitionComplete(index),
				onReverseComplete: () => this.handleSlideTransitionComplete(index)
			});

			timeline.from(element, 0.1, {display: 'none'});
			timeline.from(heading, 0.6, {
				y: 30,
				autoAlpha: 0,
				ease: Quad.easeOut
			});

			timeline.from(copy, 0.6, {
				y: 30,
				autoAlpha: 0,
				ease: Quad.easeOut
			}, '=-0.5');

			this._slideTransitions.push({
				timeline: timeline,
				completeMethod: null
			});
		});
	}

	/**
	 * @private
	 * @method handleSlideTransitionComplete
	 * @param index
	 */
	private handleSlideTransitionComplete(index: number): void
	{
		let transitionObject = this._slideTransitions[index];

		if(transitionObject && transitionObject.completeMethod)
		{
			transitionObject.completeMethod();

			// Reset the complete method
			this._slideTransitions[index].completeMethod = null;
		}
	}

	/**
	 * @public
	 * @method transitionOutStep
	 * @param index
	 */
	public transitionOutStep(index: number): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{
			this._slideTransitions[index].timeline.timeScale(2);
			this._slideTransitions[index].completeMethod = resolve;
			this._slideTransitions[index].timeline.reverse()
		})
	}

	/**
	 * @public
	 * @method transitionInStep
	 * @param index
	 */
	public transitionInStep(index: number): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{
			this._slideTransitions[index].completeMethod = resolve;
			this._slideTransitions[index].timeline.timeScale(1);
			this._slideTransitions[index].timeline.restart();
		})
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const mobilePagination = this.element.querySelector('.component-paginator-dashed');

		this.transitionInTimeline.from(this.element, 1, {
			opacity: 0
		});

		this.transitionInTimeline.add(()=> this._slideTransitions[0].timeline.play());

		if(mobilePagination && DataManager.getInstance().deviceStateTracker.currentState() <= DeviceState.SMALL)
		{
			this.transitionInTimeline.add(this.getSubTimeline(mobilePagination));
		}
	}
}

export default BlockPathToPurchaseTransitionController;
