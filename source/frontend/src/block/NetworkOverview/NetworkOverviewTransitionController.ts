import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';
import IAbstractTransitionComponent from 'vue-transition-component/lib/interface/IAbstractTransitionComponent';

class NetworkOverviewTransitionController extends AbstractTransitionController {
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
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.draggableContainer,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.add(this.getSubTimeline('ScrollBar'));
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default NetworkOverviewTransitionController;
