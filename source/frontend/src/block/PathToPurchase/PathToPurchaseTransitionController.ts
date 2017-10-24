import { AbstractTransitionController } from 'vue-transition-component';

class PathToPurchaseTransitionController extends AbstractTransitionController {
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
			},
		);

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

export default PathToPurchaseTransitionController;
