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
			this.transitionInTimeline.add(() => this.getSubTimeline(`MainProductNavItem${index}`), '=-1');
		});

		this.transitionInTimeline.add(() => this.getSubTimeline('DashedPaginator'), 1);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
	}
}

export default MainProductNavTransitionController;
