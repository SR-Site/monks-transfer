import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";
import Promise = require("bluebird");
import BlockHeroMainController from "./BlockHeroMainController";
import DataManager from "../../../data/DataManager";
import DestructibleHelper from "../../../../lib/temple/core/DestructibleHelper";

class BlockHeroMainTransitionController extends AbstractTransitionController<BlockHeroMainController>
{
	private _mainTriangleAnimation: TriangleTransitionController<BlockHeroMainController>;
	private _slideTransitions: Array<{timeline: TimelineLite, completeMethod: () => void}> = [];

	private _destructibles: DestructibleHelper = new DestructibleHelper();

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._destructibles.addKOSubscription(
			DataManager.getInstance().deviceStateTracker.currentState.subscribe(() =>
			{
				this.setupSlideTransition();

				setTimeout(() =>
				{
					this.transitionInStep(this.parentController.activeIndex);
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
		return Promise.all([

			new Promise((resolve: () => void, reject: () => void) =>
			{
				this._slideTransitions[index].timeline.timeScale(2);
				this._slideTransitions[index].completeMethod = resolve;
				this._slideTransitions[index].timeline.reverse()
			}),

			this._mainTriangleAnimation.transitionOut()
		])
	}

	/**
	 * @public
	 * @method transitionInStep
	 * @param index
	 */
	public transitionInStep(index: number): Promise<any>
	{
		return Promise.all([
			this._mainTriangleAnimation.transitionIn(),
			new Promise((resolve: () => void, reject: () => void) =>
			{
				this._slideTransitions[index].completeMethod = resolve;
				this._slideTransitions[index].timeline.timeScale(1);
				this._slideTransitions[index].timeline.restart();
			}),
		])

	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.01, {opacity: 0});

		// Run the background switch
		this.transitionInTimeline.add(() => this.parentController.changeBackgroundImage(this.parentController.activeIndex), 0);

		// Slide in the main triangle
		this.transitionInTimeline.add(() => this._mainTriangleAnimation.getTransitionInTimeline().play(), 1);

		// Slide in the secondary triangle
		this.transitionInTimeline.from(this.element.querySelector('.secondary-background-triangle'), 2, {
			x: window.innerWidth,
			y: -window.innerWidth,
			ease: Expo.easeOut,
			delay: this._mainTriangleAnimation.transitionInDuration
		}, 1);

		// Slide in the tertiary triangle
		this.transitionInTimeline.from(this.element.querySelector('.tertiary-background-triangle'), 1.6, {
			x: window.innerWidth,
			y: -window.innerWidth,
			ease: Expo.easeOut
		}, 1.4);

		// Run the text animation
		const slideTransition = this._slideTransitions[this.parentController.activeIndex].timeline;

		this.transitionInTimeline.add(() => slideTransition.restart(), 3 - slideTransition.duration());
	}

	/**
	 * @private
	 * @method setupSlideTransition
	 */
	private setupSlideTransition(): void
	{
		const slideContent = Array.prototype.slice.call(this.element.querySelectorAll('.slide-content'));
		const statistics = this.element.querySelectorAll('.statistics-wrapper');

		this.clearCurrentTimelines();

		this.parentController.options.slides.forEach((slide, index: number) =>
		{
			let element = slideContent[index];
			let heading = element.querySelector('.heading');
			let copy = element.querySelector('.copy');
			let button = element.querySelector('.component-button-circle-arrow');

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

			if(copy)
			{
				timeline.from(copy, 0.6, {
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut
				}, '=-0.5');
			}

			if(button)
			{
				timeline.from(button, 0.6, {
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut
				}, '=-0.5');
			}

			if(statistics.length)
			{
				timeline.from(statistics[index].querySelector('.heading'), 0.6, {
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut
				}, 0.2);

				timeline.from(statistics[index].querySelectorAll('.statistic'), 0.6, {
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut
				}, 0.25)
			}

			this._slideTransitions.push({
				timeline: timeline,
				completeMethod: null
			});
		});
	}

	/**
	 * @private
	 * @method clearCurrentTimelines
	 */
	private clearCurrentTimelines(): void
	{
		// Remove existing timeline configuration before setting it
		this._slideTransitions.forEach((slideTransition, index) =>
		{
			if(slideTransition.timeline)
			{
				this.killAndClearTimeline(slideTransition.timeline);
			}

			slideTransition.timeline = null;
			slideTransition.completeMethod = null;
		});


		// Kill the main triangle animation
		if(this._mainTriangleAnimation)
		{
			this._mainTriangleAnimation.destruct();
		}

		this._slideTransitions = [];

		this._mainTriangleAnimation = new TriangleTransitionController<BlockHeroMainController>(
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

export default BlockHeroMainTransitionController;



