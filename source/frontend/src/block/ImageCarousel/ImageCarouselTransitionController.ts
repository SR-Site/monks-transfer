import { AbstractTransitionController, IAbstractTransitionComponent } from 'vue-transition-component';

class ImageCarouselTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.sliderViewport,
			1,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
		);

		if (this.viewModel.hasChild('DashedPaginator')) {
			this.transitionInTimeline.add(this.getSubTimeline('DashedPaginator'), 0);
		}

		if (this.viewModel.$refs.playButton) {
			(<Array<IAbstractTransitionComponent>>this.viewModel.$refs.playButton).forEach(playButton => {
				this.transitionInTimeline.add(this.getSubTimeline(playButton.componentId), 0);
			});
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ImageCarouselTransitionController;
