import { AbstractTransitionController } from 'vue-transition-component';
import { TimelineLite, Linear } from 'gsap';
import { DeviceState } from 'config/deviceStateConfig';

class HowToAdvertiseTransitionController extends AbstractTransitionController {
	private _howToAdvertiseTimeline: TimelineLite = new TimelineLite({ paused: true });

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.5,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
		);
		this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'));
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}

	/**
	 * @private
	 * @method setupHowToAdvertiseTimeline
	 */
	public setupHowToAdvertiseTimeline(): void {
		const stepsViewPort = <HTMLElement>this.viewModel.$refs.stepsViewport;
		const stepsWrapper = <HTMLElement>this.viewModel.$refs.steps;
		const steps = <Array<HTMLElement>>this.viewModel.$refs.step;

		const iconWidth = (<HTMLElement>steps[0].querySelector('.icon')).offsetWidth;
		const overflow = stepsViewPort.offsetWidth - stepsWrapper.offsetWidth;

		this._howToAdvertiseTimeline.to(stepsWrapper, steps.length - 1, {
			x: overflow - (stepsViewPort.offsetWidth - steps[0].offsetWidth),
			ease: Linear.easeNone,
		});

		steps.forEach((step, index) => {
			const icon = step.querySelector('.icon');
			const description = step.querySelector('.content');

			if (index > 0) {
				this._howToAdvertiseTimeline.from(icon, 1, {
					scale: 0.8,
					backgroundColor: '#ffffff',
					ease: Linear.easeNone,
				}, index - 1);

				if ((<any>this.viewModel).deviceState > DeviceState.SMALL) {
					this._howToAdvertiseTimeline.from(step, 1, {
						width: iconWidth,
						ease: Linear.easeNone,
					}, index - 1);
				}

				this._howToAdvertiseTimeline.from(description, 0.25, {
					opacity: 0,
					ease: Linear.easeNone,
				}, index - 0.25);
			}
		});
	}

	public updateHowToAdvertiseTimeline() {
		this.killAndClearTimeline(this._howToAdvertiseTimeline);

		setTimeout(() => this.setupHowToAdvertiseTimeline(), 100);
	}

	/**
	 * @public
	 * @method getHowToAdvertiseProgress
	 */
	public getHowToAdvertiseProgress(): number {
		return this._howToAdvertiseTimeline.progress();
	}

	/**
	 * @public
	 * @method seekHowToAdvertiseTimeline
	 * @param progress
	 */
	public seekHowToAdvertiseTimeline(progress: number): void {
		this._howToAdvertiseTimeline.seek(this._howToAdvertiseTimeline.duration() * progress, false);
	}
}

export default HowToAdvertiseTransitionController;
