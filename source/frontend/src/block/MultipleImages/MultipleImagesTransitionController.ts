import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';

class MultipleImagesTransitionController extends AbstractTransitionController {
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

		this.transitionInTimeline.add(this.getSubTimeline('MultipleImagesMedia1'), '-=0.8');
		this.transitionInTimeline.add(
			this.getSubTimeline('MultipleImagesMedia2'),
			`-=${this.getSubTimelineDuration('MultipleImagesMedia1') * 0.8}`,
		);
		this.transitionInTimeline.add(
			this.getSubTimeline('MultipleImagesSkills'),
			`-=${this.getSubTimelineDuration('MultipleImagesMedia2') * 0.8}`,
		);
		this.transitionInTimeline.add(
			this.getSubTimeline('MultipleImagesMedia3'),
			`-=${this.getSubTimelineDuration('MultipleImagesSkills') * 0.8}`,
		);
		this.transitionInTimeline.add(
			this.getSubTimeline('MultipleImagesCallToAction'),
			`-=${this.getSubTimelineDuration('MultipleImagesMedia3') * 0.8}`,
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default MultipleImagesTransitionController;
