import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';
import IAbstractRegistrableComponent from 'vue-transition-component/lib/interface/IAbstractRegistrableComponent';

class MainProductNavTransitionController extends AbstractTransitionController {
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

		(<Array<IAbstractRegistrableComponent>>this.viewModel.$refs.item).forEach((item, index) => {
			const componentId = `MainProductNavItem${index}`
			const duration = this.getSubTimelineDuration(componentId);
			const offset = index > 0 ? duration * 0.75 : 0.2;
			this.transitionInTimeline.add(this.getSubTimeline(componentId), `-=${offset}`);
		});

		// this.transitionInTimeline.add(this.getSubTimeline('DashedPaginator'), '-=0.5');

		console.log(this.transitionInTimeline.getChildren());
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default MainProductNavTransitionController;
