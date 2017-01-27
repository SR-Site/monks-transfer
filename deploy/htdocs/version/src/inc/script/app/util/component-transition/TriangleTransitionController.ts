import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class TriangleTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.fromTo(this.element, 1,
			{
				xPercent: -200,
				yPercent: 100
			},
			{
				xPercent: 0,
				yPercent: 0,
				ease:Expo.easeOut
			}
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionOutTimeline(): void
	{
		this.transitionOutTimeline.fromTo(this.element, 1,
			{
				xPercent: 0,
				yPercent: 0
			},
			{
				xPercent: 200,
				yPercent: -100,
				ease:Expo.easeIn
			}
		);
	}

	/**
	 * @public
	 * @method getTimeline
	 */
	public getTimeline(): Animation
	{
		return this.transitionInTimeline.play();
	}

}

export default TriangleTransitionController;
