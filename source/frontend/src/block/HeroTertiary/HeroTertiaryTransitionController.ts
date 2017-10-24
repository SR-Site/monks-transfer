import { AbstractTransitionController } from 'vue-transition-component';

class HeroTertiaryTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const heroTertiaryComponent: any = this.viewModel;

		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
			},
		);
		this.transitionInTimeline.add(() => heroTertiaryComponent.setCrossFaderBackground());
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default HeroTertiaryTransitionController;
