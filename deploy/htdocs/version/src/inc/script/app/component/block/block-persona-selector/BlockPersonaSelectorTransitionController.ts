import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import Promise = require("bluebird");
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";
import BlockPersonaSelectorController from "./BlockPersonaSelectorController";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";
import DataManager from "../../../data/DataManager";
import DestructibleHelper from "../../../../lib/temple/core/DestructibleHelper";

class BlockPersonaSelectorTransitionController extends AbstractTransitionController<BlockPersonaSelectorController>
{
	private _mainTriangleAnimation: TriangleTransitionController<BlockPersonaSelectorController>;
	private _destructibles: DestructibleHelper = new DestructibleHelper();
	private _slideTransitions: Array<{
		timeline: TimelineLite,
		completeMethod: () => void
	}> = [];

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._destructibles.addKOSubscription(
			DataManager.getInstance().deviceStateTracker.currentState.subscribe(() =>
			{
				this.setupTriangleAnimation();

				setTimeout(() =>
				{
					this._mainTriangleAnimation.transitionIn();
				}, 100);
			})
		)
	}

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
		const personaContent = Array.prototype.slice.call(this.element.querySelectorAll('.persona'));

		this.setupTriangleAnimation();

		this.parentController.options.personas.forEach((persona, index: number) =>
		{
			let element = personaContent[index];
			let button = element.querySelector('.component-button-main');

			let timeline = new TimelineLite({
				paused: true,
				onComplete: () => this.handleSlideTransitionComplete(index),
				onReverseComplete: () => this.handleSlideTransitionComplete(index)
			});

			timeline.from(element.querySelector('.heading'), 0.6, {
				y: 30,
				autoAlpha: 0,
				ease: Quad.easeOut
			});

			timeline.from(element.querySelector('.copy'), 0.6, {
				y: 30,
				autoAlpha: 0,
				ease: Quad.easeOut
			}, '=-0.5');

			if(button)
			{
				timeline.add(this.getSubTimeline(button), '=-0.2');
			}

			this._slideTransitions.push({
				timeline: timeline,
				completeMethod: null
			});
		});
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const pagination = this.element.querySelector('.component-paginator-dashed');

		this.transitionInTimeline.from(this.element, 0.01, {autoAlpha: 0});

		// Slide in the main triangle
		this.transitionInTimeline.add(() => this._mainTriangleAnimation.getTransitionInTimeline().play(), 1);

		// Run the text animation
		const slideTransition = this._slideTransitions[this.parentController.activeIndex].timeline;

		this.transitionInTimeline.add(() => slideTransition.restart(), 2.2 - slideTransition.duration());

		if(DataManager.getInstance().deviceStateTracker.currentState() < DeviceState.MEDIUM)
		{
			// Transition in the paginator
			this.transitionInTimeline.add(this.getSubTimeline(pagination));
		}
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
			this._slideTransitions[index].completeMethod = resolve;
			this._slideTransitions[index].timeline.timeScale(2);
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
			// Switch the background
			if(DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL)
			{
				// Slide out the main triangle
				this._mainTriangleAnimation.transitionOut()
					.then(() =>
					{
						this._mainTriangleAnimation.transitionIn();

						this._slideTransitions[index].completeMethod = resolve;
						this._slideTransitions[index].timeline.timeScale(1);
						this._slideTransitions[index].timeline.restart();
					})
			}
			else
			{
				this._slideTransitions[index].completeMethod = resolve;
				this._slideTransitions[index].timeline.timeScale(1);
				this._slideTransitions[index].timeline.restart();
			}
		});
	}

	/**
	 * @private
	 * @method setupTriangleAnimation
	 */
	private setupTriangleAnimation(): void
	{
		// Kill the main triangle animation
		if(this._mainTriangleAnimation)
		{
			this._mainTriangleAnimation.destruct();
		}

		this._mainTriangleAnimation = new TriangleTransitionController<BlockPersonaSelectorController>(
			<HTMLElement>this.element.querySelector('.background-triangle'),
			this.parentController
		);
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		this._mainTriangleAnimation = null;
		this._slideTransitions = null;

		super.destruct();
	}
}

export default BlockPersonaSelectorTransitionController;
