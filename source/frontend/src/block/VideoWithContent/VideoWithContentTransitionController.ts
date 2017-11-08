import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class VideoWithContentTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const wrapper = <HTMLElement>this.viewModel.$refs.videoWrapper;
		const width = wrapper.offsetWidth;
		const height = wrapper.offsetHeight;

		this.transitionInTimeline.fromTo(
			(<any>this.viewModel.$refs.videoPoster).$el,
			2,
			{
				clip: 'rect(0, 0,' + height + ', 0)',
				opacity: 0,
			},
			{
				clip: 'rect(0, ' + width + ', ' + height + ', 0)',
				opacity: 1,
				clearProps: 'clip',
				ease: Expo.easeOut,
			}, 0,
		);

		this.transitionInTimeline.add(this.getSubTimeline('ButtonCirclePlay'));
		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				ease: Linear.easeNone,
			},
			0.5,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.8,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				ease: Linear.easeNone,
			},
			0.7,
		);

		if (this.viewModel.hasChild('ButtonPrimary')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), 0.9);
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default VideoWithContentTransitionController;
