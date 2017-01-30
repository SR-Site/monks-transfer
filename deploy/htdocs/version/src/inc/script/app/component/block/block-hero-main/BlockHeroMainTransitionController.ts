import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";
import Promise = require("bluebird");

class BlockHeroMainTransitionController extends DefaultTransitionController
{
	private _mainTriangleAnimation: TriangleTransitionController;
	private _slideTransitions: Array<{
		timeline: TimelineLite,
		completeMethod: Function
	}> = [];

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._mainTriangleAnimation = new TriangleTransitionController(
			<HTMLElement>this.element.querySelector('.background-triangle'),
			this.parentController
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
		const slideContent = Array.prototype.slice.call(this.element.querySelectorAll('.slide-content'));

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

			timeline.from(heading, 0.8, {
				y: 50,
				autoAlpha: 0,
				ease: Expo.easeOut
			});

			if(copy)
			{
				timeline.from(copy, 0.8, {
					y: 50,
					autoAlpha: 0,
					ease: Expo.easeOut
				}, '=-0.7');
			}

			if(button)
			{
				timeline.from(button, 0.8, {
					y: 50,
					autoAlpha: 0,
					ease: Expo.easeOut
				}, '=-0.7');
			}

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
		return Promise.all([
			new Promise((resolve, reject) =>
			{
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
			new Promise((resolve, reject) =>
			{
				this._slideTransitions[index].completeMethod = resolve;
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
		this.transitionInTimeline.from(this.element, 0.5, {
			opacity: 0
		});

		this.transitionInTimeline.add(() => this.parentController.changeBackgroundImage(this.parentController.activeIndex));
		this.transitionInTimeline.add(() => this._mainTriangleAnimation.transitionIn());
		this.transitionInTimeline.add(() => this._slideTransitions[this.parentController.activeIndex].timeline.restart());
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



