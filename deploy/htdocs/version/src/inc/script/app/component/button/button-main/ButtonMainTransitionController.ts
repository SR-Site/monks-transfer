import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import Promise = require("bluebird");
import ButtonMainController from "./ButtonMainController";

class ButtonMainTransitionController extends AbstractTransitionController<ButtonMainController>
{
	private _hoverTimeline: TimelineLite;
	private _hoverResolveMethod: ()=>void;

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element.querySelector('.stripe'), 0.8, {
			ease: Expo.easeOut,
			width: 0,
			clearProps: "all"
		}, 0);

		this.transitionInTimeline.from(this.element.querySelector('.background'), 0.8, {
			ease: Expo.easeOut,
			opacity: 0
		}, 0);

		this.transitionInTimeline.from(this.element.querySelector('.label'), 0.8, {
			ease: Expo.easeOut,
			opacity: 0
		}, 0);

		this.addEventListener(AbstractTransitionController.TRANSITION_IN_COMPLETE, () => this.setupHoverTimeline());
	}

	/**
	 * @public
	 * @method resetHoverTimeline
	 */
	public resetHoverTimeline(): void
	{
		if(this._hoverTimeline)
		{
			this._hoverTimeline.kill();
			this._hoverTimeline = null;
		}

		this.setupHoverTimeline();
	}

	/**
	 * @private
	 * @method setupHoverTimeline
	 */
	private setupHoverTimeline(): void
	{
		this._hoverTimeline = new TimelineLite({
			paused: true,
			onReverseComplete: () =>
			{

				if(this._hoverResolveMethod)
				{
					this._hoverResolveMethod();
					this._hoverResolveMethod = null;
				}
			}
		});

		this._hoverTimeline.fromTo(this.element.querySelector('.stripe'), 1,
			{
				scaleX: 1
			},
			{
				scaleX: 0,
				ease: Power3.easeInOut
			});

		this._hoverTimeline.fromTo(this.element.querySelector('.hover-stroke'), 1,
			{
				strokeDasharray: '0px ' + this._parentController.fullPath + 'px',
				strokeDashoffset: this._parentController.height / 2
			},
			{
				strokeDasharray: this._parentController.fullPath + 'px 0px',
				strokeDashoffset: (this._parentController.fullPath / 2) + (this._parentController.height / 2),
				ease: Power3.easeInOut
			}, '=-0.2'
		)
	}

	/**
	 * @public
	 * @method playMouseEnter
	 */
	public onMouseEnter(): void
	{
		if(!this._hoverTimeline)
		{
			return;
		}

		this._hoverTimeline.play();
	}

	/**
	 * @public
	 * @method playMouseLeave
	 */
	public onMouseLeave(): Promise<any>
	{
		if(!this._hoverTimeline)
		{
			return Promise.resolve();
		}

		return new Promise((resolve: ()=>void) =>
		{
			this._hoverResolveMethod = resolve;
			this._hoverTimeline.reverse();
		});
	}
}

export default ButtonMainTransitionController;
