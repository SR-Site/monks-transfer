import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import Promise = require("bluebird");

class BlockPersonaSelectorTransitionController extends DefaultTransitionController
{
	public slideTransitions: Array<{
		timeline: TimelineLite,
		completeMethod: Function
	}> = [];

	/**
	 * @public
	 * @method setupTransitionTimeline
	 * @description This method will be used for setting up the timeline for the component
	 */
	public setupTransitionTimeline(): void
	{
		const personaContent = Array.prototype.slice.call(this.element.querySelectorAll('.persona'));

		this.parentController.options.personas.forEach((persona, index: number) =>
		{
			let element = personaContent[index];

			let timeline = new TimelineLite({
				paused: true,
				onComplete: () => this.handleSlideTransitionComplete(index),
				onReverseComplete: () => this.handleSlideTransitionComplete(index)
			});

			timeline.from(element.querySelector('.heading'), 0.8, {
				x: -100,
				autoAlpha: 0,
				ease: Expo.easeOut
			});

			timeline.from(element.querySelector('.copy'), 0.8, {
				x: -100,
				autoAlpha: 0,
				ease: Expo.easeOut
			}, '=-0.7');

			timeline.from(element.querySelector('.component-button-main'), 0.8, {
				x: -100,
				autoAlpha: 0,
				ease: Expo.easeOut
			}, '=-0.7');

			this.slideTransitions.push({
				timeline: timeline,
				completeMethod: null
			});
		});

		super.setupTransitionTimeline();
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			autoAlpha: 0
		});

		this.transitionInTimeline.add(
			() => this.parentController.changeBackgroundImage(this.parentController.activeIndex)
		);

		this.transitionInTimeline.add(
			() => this.slideTransitions[this.parentController.activeIndex].timeline.restart()
		)
	}

	/**
	 * @private
	 * @method handleSlideTransitionComplete
	 * @param index
	 */
	private handleSlideTransitionComplete(index: number): void
	{
		let transitionObject = this.slideTransitions[index];

		if(transitionObject && transitionObject.completeMethod)
		{
			transitionObject.completeMethod();

			// Reset the complete method
			this.slideTransitions[index].completeMethod = null;
		}
	}

	/**
	 * @public
	 * @method transitionOutStep
	 * @param index
	 */
	public transitionOutStep(index: number): Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			this.slideTransitions[index].completeMethod = resolve;
			this.slideTransitions[index].timeline.reverse()
		})
	}

	/**
	 * @public
	 * @method transitionInStep
	 * @param index
	 */
	public transitionInStep(index: number): Promise<any>
	{
		return new Promise((resolve, reject) =>
		{
			this.slideTransitions[index].completeMethod = resolve;
			this.slideTransitions[index].timeline.restart();
		})
	}
}

export default BlockPersonaSelectorTransitionController;
