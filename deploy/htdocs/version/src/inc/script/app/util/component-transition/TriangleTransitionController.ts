import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class TriangleTransitionController extends DefaultTransitionController
{
	private _duration: number = 1;

	constructor(element: HTMLElement, parentController: any, duration: number = 1)
	{
		super(element, parentController, true);

		this._duration = duration;
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.fromTo(this.element, this._duration,
			{
				xPercent: -200,
				yPercent: 100
			},
			{
				xPercent: 0,
				yPercent: 0,
				ease: Expo.easeOut
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
		this.transitionOutTimeline.fromTo(this.element, this._duration,
			{
				xPercent: 0,
				yPercent: 0
			},
			{
				xPercent: 200,
				yPercent: -100,
				ease: Expo.easeIn
			}
		);
	}
}

export default TriangleTransitionController;
