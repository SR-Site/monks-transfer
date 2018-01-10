import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class InfographicTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			1,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'-=0.5',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			0.8,
			{
				// y: 50,
				autoAlpha: 0,
			},
			{
				// y: 0,
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'-=0.5',
		);

        if (this.viewModel.hasChild('ButtonPrimaryLink')) {
            this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimaryLink'), '-=0.5');
        }

		if (this.viewModel.hasChild('ButtonSecondaryLink')) {
            this.transitionInTimeline.add(this.getSubTimeline('ButtonSecondaryLink'), '-=0.5');
		}

	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default InfographicTransitionController;
