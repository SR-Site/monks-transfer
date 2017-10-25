import { AbstractTransitionController } from 'vue-transition-component';

class PersonaSelectorTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.8,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
			},
		);

		const personaSelectorComponent: any = this.viewModel;

		// Run the background switch
		this.transitionInTimeline.add(() => personaSelectorComponent.openPersona(personaSelectorComponent.activeIndex));

		if (this.viewModel.hasChild('DashedPaginator')) {
			this.transitionInTimeline.add(this.getSubTimeline('DashedPaginator'));
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default PersonaSelectorTransitionController;
