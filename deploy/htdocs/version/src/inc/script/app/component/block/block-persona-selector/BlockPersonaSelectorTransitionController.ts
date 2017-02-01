import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import Promise = require("bluebird");
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";
import BlockPersonaSelectorController from "./BlockPersonaSelectorController";

class BlockPersonaSelectorTransitionController extends AbstractTransitionController<BlockPersonaSelectorController>
{
	private _mainTriangleAnimation: TriangleTransitionController<BlockPersonaSelectorController>;
	private _slideTransitions: Array<{
		timeline: TimelineLite,
		completeMethod: () => void
	}> = [];

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._mainTriangleAnimation = new TriangleTransitionController<BlockPersonaSelectorController>(
			<HTMLElement>this.element.querySelector('.background-triangle'),
			this._parentController,
			1
		);
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

		this._parentController.options.personas.forEach((persona, index: number) =>
		{
			let element = personaContent[index];

			let timeline = new TimelineLite({
				paused: true,
				onComplete: () => this.handleSlideTransitionComplete(index),
				onReverseComplete: () => this.handleSlideTransitionComplete(index)
			});

			timeline.from(element.querySelector('.heading'), 0.8, {
				y: 50,
				autoAlpha: 0,
				ease: Expo.easeOut
			});

			timeline.from(element.querySelector('.copy'), 0.8, {
				y: 50,
				autoAlpha: 0,
				ease: Expo.easeOut
			}, '=-0.7');

			timeline.from(element.querySelector('.component-button-main'), 0.8, {
				y: 50,
				autoAlpha: 0,
				ease: Expo.easeOut
			}, '=-0.7');

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
		this.transitionInTimeline.from(this.element, 0.5, {autoAlpha: 0});

		// Transition in the paginator
		this.transitionInTimeline.from(this.element.querySelector('.component-paginator-dashed'), 0.5, {
			autoAlpha: 0
		});

		// Run the background switch
		this.transitionInTimeline.add(() => this._parentController.changeBackgroundImage(this._parentController.activeIndex));

		// Slide in the main triangle
		this.transitionInTimeline.add(() => this._mainTriangleAnimation.getTransitionInTimeline().play(), '=+0.5');

		// Run the text animation
		this.transitionInTimeline.add(() => this._slideTransitions[this._parentController.activeIndex].timeline.restart())
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
			this._parentController.changeBackgroundImage(index);

			// Slide out the main triangle
			this._mainTriangleAnimation.transitionOut()
				.then(() => this._mainTriangleAnimation.transitionIn())
				.then(() =>
				{
					this._slideTransitions[index].completeMethod = resolve;
					this._slideTransitions[index].timeline.restart();
				})
		});
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
