import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';

class InfoTransitionController extends AbstractTransitionController {
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
				opacity: 0,
			},
			{
				opacity: 1,
				clearProps: 'all',
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.clipMask,
			1.6,
			{
				scaleX: 1,
			},
			{
				scaleX: 0,
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.5,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
			1.1,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.5,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
			1.3,
		);

		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), 1.5);
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default InfoTransitionController;
