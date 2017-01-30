import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import Promise = require("bluebird");

class ProgramModuleItemTransitionController extends DefaultTransitionController
{
	private _mouseEnterTimeline: TimelineLite;
	private _mouseLeaveResolveMethod: Function;

	/**
	 * @protected
	 * @method setupTransitionInTimeline
	 */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.4, {opacity: 0});

		this.addEventListener(DefaultTransitionController.TRANSITION_IN_COMPLETE, () => this.setupHoverTimeline());
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 */
	public setupHoverTimeline(): void
	{
		this._mouseEnterTimeline = new TimelineLite({
			paused: true,
			onStart: () =>
			{
				TweenLite.set(this.element, {zIndex: 1});
			},
			onReverseComplete: () =>
			{
				this.element.removeAttribute('style');

				if(this._mouseLeaveResolveMethod)
				{
					this._mouseLeaveResolveMethod();
					this._mouseLeaveResolveMethod = null;
				}
			}
		});

		this._mouseEnterTimeline.to(this.element.querySelectorAll('.hover-content'), 0.4, {
			opacity: 0,
			ease: Power3.easeOut
		});

		this._mouseEnterTimeline.fromTo(this.element.querySelectorAll('.hover-container'), 0.4,
			{
				width: '100%'
			},
			{
				ease: Expo.easeOut,
				width: '200%'
			});

		this._mouseEnterTimeline.to(this.element.querySelectorAll('.hover-content'), 0.4, {
			opacity: 1,
			ease: Power3.easeOut
		});
	}

	/**
	 * @public
	 * @method playMouseEnter
	 */
	public onMouseEnter(): void
	{
		if(!this._mouseEnterTimeline)
		{
			return;
		}

		this._mouseEnterTimeline.timeScale(1);
		this._mouseEnterTimeline.play();
	}

	/**
	 * @public
	 * @method playMouseLeave
	 */
	public onMouseLeave(): Promise<any>
	{
		if(!this._mouseEnterTimeline)
		{
			return Promise.resolve();
		}

		return new Promise((resolve: Function) =>
		{
			this._mouseLeaveResolveMethod = resolve;

			this._mouseEnterTimeline.timeScale(2.5);
			this._mouseEnterTimeline.reverse();
		});
	}

	public destruct(): void
	{
		if(this._mouseEnterTimeline)
		{
			this._mouseEnterTimeline.kill();
			this._mouseEnterTimeline = null;
		}

		super.destruct();
	}
}

export default ProgramModuleItemTransitionController;
