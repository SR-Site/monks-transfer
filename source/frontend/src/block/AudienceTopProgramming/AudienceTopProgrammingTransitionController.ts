import { AbstractTransitionController } from 'vue-transition-component';
import { Linear, Expo } from 'gsap';

class AudienceTopProgrammingTransitionController extends AbstractTransitionController {
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
				clearProps: 'all',
			},
		);

		(<Array<any>>this.viewModel.$refs.slide).forEach((slide, index) => {
			this.transitionInTimeline.add(this.getSubTimeline(`AudienceTopProgrammingSlide${index}`), 0.7);
		});

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.previous,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			1,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.next,
			0.8,
			{
				autoAlpha: 0,
				y: 50,
			},
			{
				autoAlpha: 1,
				y: 0,
				ease: Expo.easeOut,
				clearProps: 'all',
			},
			1,
		);

		this.transitionInTimeline.add(this.getSubTimeline('DashedPaginator'), 1);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default AudienceTopProgrammingTransitionController;
