import { AbstractTransitionController } from 'vue-transition-component';

class DownloadFileATransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
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
			},
			'=-0.5',
		);
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.fileDescription,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
			},
			'=-0.5',
		);
		this.transitionInTimeline.add(
			this.getSubTimeline('ButtonPrimary'),
			'=-0.5',
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default DownloadFileATransitionController;
