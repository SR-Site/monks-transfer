import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockHowToAdvertiseController from "./BlockHowToAdvertiseController";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";

class BlockHowToAdvertiseTransitionController extends AbstractTransitionController<BlockHowToAdvertiseController>
{
	private _howToAdvertiseTimeline: TimelineLite = new TimelineLite({paused: true});

	/**
	 * @public
	 * @method setupTransitionTimeline
	 * @description This method will be used for setting up the timeline for the component
	 */
	public setupTransitionTimeline(): void
	{
		this.setupHowToAdvertiseTimeline();

		super.setupTransitionTimeline();
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.add(this.getSubTimeline(this.element.querySelector('.component-button-main')))
	}

	/**
	 * @private
	 * @method setupHowToAdvertiseTimeline
	 */
	private setupHowToAdvertiseTimeline(): void
	{
		const stepsViewPort = <HTMLElement>this.element.querySelector('.steps-viewport');
		const stepsWrapper = <HTMLElement>this.element.querySelector('.steps');
		const steps = Array.prototype.slice.call(this.element.querySelectorAll('.step'));

		const iconWidth = steps[0].querySelector('figure').offsetWidth;
		const overflow = stepsViewPort.offsetWidth - stepsWrapper.offsetWidth;

		this._howToAdvertiseTimeline.to(stepsWrapper, steps.length - 1, {
			x: overflow - (stepsViewPort.offsetWidth - steps[0].offsetWidth),
			ease: Linear.easeNone
		});

		steps.forEach((step, index) =>
		{
			const icon = step.querySelector('figure');
			const description = step.querySelector('aside');

			if(index > 0)
			{
				this._howToAdvertiseTimeline.from(icon, 1, {
					scale: 0.8,
					backgroundColor: '#ffffff',
					ease: Linear.easeNone
				}, index - 1);

				if(DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL)
				{
					this._howToAdvertiseTimeline.from(step, 1, {
						width: iconWidth,
						ease: Linear.easeNone
					}, index - 1);
				}

				this._howToAdvertiseTimeline.from(description, 0.25, {
					opacity: 0,
					ease: Linear.easeNone
				}, index - 0.25);
			}
		})
	}

	/**
	 * @public
	 * @method getHowToAdvertiseProgress
	 */
	public getHowToAdvertiseProgress(): number
	{
		return this._howToAdvertiseTimeline.progress();
	}


	/**
	 * @public
	 * @method seekHowToAdvertiseTimeline
	 * @param progress
	 */
	public seekHowToAdvertiseTimeline(progress: number): void
	{
		this._howToAdvertiseTimeline.seek(this._howToAdvertiseTimeline.duration() * progress);
	}
}

export default BlockHowToAdvertiseTransitionController;
