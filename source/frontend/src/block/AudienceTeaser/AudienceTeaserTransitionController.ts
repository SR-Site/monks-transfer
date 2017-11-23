import { AbstractTransitionController } from 'vue-transition-component';
import { Cubic } from 'gsap';

class AudienceTeaserTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				clearProps: 'all',
			},
		);

		if (this.viewModel.hasChild('ButtonCirclePlay')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonCirclePlay'), 0.8);
		}

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				clearProps: 'all',
			},
			'-=0.8',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.subHeading,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				clearProps: 'all',
			},
			'-=0.8',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				clearProps: 'all',
			},
			'-=0.8',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.bottom,
			1,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				clearProps: 'all',
			},
			'-=0.8',
		);
	}

	/**
	* @public
	* @method setupTransitionOutTimeline
	* @description Use this method to setup your transition out timeline
	* */
	protected setupTransitionOutTimeline(): void {
	}
}

export default AudienceTeaserTransitionController;
