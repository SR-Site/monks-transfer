import { AbstractTransitionController } from 'vue-transition-component';

class HeroMainTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.01,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
			},
		);

		const heroMainComponent: any = this.viewModel;

		// Run the background switch
		this.transitionInTimeline.add(() => heroMainComponent.changeBackgroundImage(heroMainComponent.activeIndex));

		// Slide in the triangles
		this.transitionInTimeline.add(this.getSubTimeline('PrimaryTriangle'), 1);
		this.transitionInTimeline.add(this.getSubTimeline('SecondaryTriangle'), 1);

		if (this.viewModel.hasChild('TertiaryTriangle')) {
			this.transitionInTimeline.add(this.getSubTimeline('TertiaryTriangle'), 1.4);
		}

		// Transition in the slide content
		this.transitionInTimeline.add(this.getSubTimeline(`HeroMainSlide${heroMainComponent.activeIndex}`));
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}

}

export default HeroMainTransitionController;
