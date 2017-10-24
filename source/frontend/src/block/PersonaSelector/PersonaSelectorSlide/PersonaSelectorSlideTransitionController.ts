import { AbstractTransitionController } from 'vue-transition-component';
import { Quad } from 'gsap';

class PersonaSelectorSlideTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.1,
			{
				display: 'none',
			},
			{
				display: 'block',
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.6,
			{
				y: 30,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Quad.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.6,
			{
				y: 30,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Quad.easeOut,
			},
			'=-0.3'
		);

		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), '=-0.2');
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default PersonaSelectorSlideTransitionController;
