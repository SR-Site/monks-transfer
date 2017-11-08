import { AbstractTransitionController, IAbstractTransitionComponent} from 'vue-transition-component';
import { Expo } from 'gsap';

class ProductListTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const products = <Array<IAbstractTransitionComponent>>this.viewModel.$refs.product;
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

		if (products) {
			products.forEach((article, index) => {
				this.transitionInTimeline.add(this.getSubTimeline(`ProductTeaser${index}`), 0.2);
			});
		}

		this.transitionInTimeline.add(this.getSubTimeline('ScrollBar'), 0.2);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default ProductListTransitionController;
