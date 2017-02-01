
import AbstractTransitionController from "./AbstractTransitionController";
import AbstractTransitionComponentController from "./abstract-transition-component/AbstractTransitionComponentController";

class TriangleTransitionController<TParentController extends AbstractTransitionComponentController<any, any>> extends AbstractTransitionController<TParentController>
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
		this.transitionOutTimeline.to(this.element, this._duration,
			{
				xPercent: 200,
				yPercent: -100,
				ease: Expo.easeIn
			}
		);
	}

	/**
	 * @public
	 * @method get transitionInDuration
	 * @returns {Duration|any}
	 */
	public get transitionInDuration():number
	{
		return this.transitionInTimeline.duration();
	}

	/**
	 * @public
	 * @method get transitionInDuration
	 * @returns {Duration|any}
	 */
	public get transitionOutDuration():number
	{
		return this.transitionOutTimeline.duration();
	}

	/**
	 * @private
	 * @method getTransitionInTimeline
	 */
	public getTransitionInTimeline():TimelineLite
	{
		return this.transitionInTimeline;
	}
}

export default TriangleTransitionController;
