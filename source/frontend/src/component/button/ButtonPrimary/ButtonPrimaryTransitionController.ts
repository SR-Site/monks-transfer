import { AbstractTransitionController, TransitionEvent } from 'vue-transition-component';
import { TimelineLite } from 'gsap';
import NativeEventListener from 'util/event/NativeEventListener';
import { Expo, Power3 } from 'gsap';

class ButtonPrimaryTransitionController extends AbstractTransitionController {
	private hoverTimeline: TimelineLite;
	private hoverResolveMethod: () => void;

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const stripeWidth = (<HTMLElement>this.viewModel.$refs.stripe).offsetWidth;
		const transitionInCompleteListener = new NativeEventListener(
			<any>this,
			TransitionEvent.TRANSITION_IN_COMPLETE,
			() => {
				transitionInCompleteListener.dispose();
				this.setupHoverTimeline();
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.8,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				clearProps: 'all',
			},
			0,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.stripe,
			0.8,
			{
				width: 0,
			},
			{
				width: stripeWidth,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			0,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.backgroundStroke,
			0.8,
			{
				opacity: 0,
			},
			{
				ease: Expo.easeOut,
				opacity: 1,
			},
			0,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.label,
			0.8,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
			0,
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}

	/**
	 * @public
	 * @method setupHoverTimeline
	 * @description Create the timeline for the hover animation
	 */
	public setupHoverTimeline(): void {
		const buttonPrimaryComponent: any = this.viewModel;

		this.hoverTimeline = new TimelineLite({
			paused: true,
			onReverseComplete: () => {
				if (this.hoverResolveMethod) {
					this.hoverResolveMethod();
					this.hoverResolveMethod = null;
				}
			},
		});

		this.hoverTimeline.fromTo(
			this.viewModel.$refs.stripe,
			0.5,
			{
				scaleX: 1,
			},
			{
				scaleX: 0,
				ease: Power3.easeInOut,
			},
		);

		this.hoverTimeline.fromTo(
			this.viewModel.$refs.hoverStroke,
			0.5,
			{
				strokeDasharray: '0px ' + buttonPrimaryComponent.fullPath + 'px',
				strokeDashoffset: buttonPrimaryComponent.height / 2,
			},
			{
				strokeDasharray: buttonPrimaryComponent.fullPath + 'px 0px',
				strokeDashoffset: buttonPrimaryComponent.fullPath / 2 + buttonPrimaryComponent.height / 2,
				ease: Power3.easeInOut,
			},
			'-=0.2',
		);
	}

	/**
	 * @public
	 * @method onMouseEnter
	 */
	public onMouseEnter(): void {
		if (!this.hoverTimeline) {
			return;
		}

		this.hoverTimeline.play();
	}

	/**
	 * @public
	 * @method onMouseLeave
	 */
	public onMouseLeave(): Promise<void> {
		if (!this.hoverTimeline) {
			return Promise.resolve();
		}

		return new Promise<void>((resolve: () => void) => {
			this.hoverResolveMethod = resolve;
			this.hoverTimeline.reverse();
		});
	}
}

export default ButtonPrimaryTransitionController;
