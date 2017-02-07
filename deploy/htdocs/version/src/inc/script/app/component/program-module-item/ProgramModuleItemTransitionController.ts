import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import ProgramModuleItemController from "./ProgramModuleItemController";
import Promise = require("bluebird");

class ProgramModuleItemTransitionController extends AbstractTransitionController<ProgramModuleItemController>
{
	private _mouseEnterTimeline: TimelineLite;
	private _mouseLeaveResolveMethod: () => void;

	/**
	 * @protected
	 * @method setupTransitionInTimeline
	 */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.4, {opacity: 0});
		this.transitionInTimeline.add(this.getSubTimeline('.component-button-play-circle'), '=-0.2');

		this.addEventListener(AbstractTransitionController.TRANSITION_IN_COMPLETE, () => this.setupHoverTimeline());
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

		this._mouseEnterTimeline.to(this.element.querySelectorAll('.hover-content'), 0.2, {
			opacity: 0
		}, 0);

		this._mouseEnterTimeline.fromTo(this.element.querySelectorAll('.hover-container'), 0.8,
			{
				width: '100%'
			},
			{
				ease: Expo.easeOut,
				width: '200%'
			});

		this._mouseEnterTimeline.to(this.element.querySelectorAll('.hover-content'), 0.2, {
			opacity: 1
		}, '=-0.4');
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

		return new Promise((resolve: () => void) =>
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
