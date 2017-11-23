import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';
import IAbstractTransitionComponent from 'vue-transition-component/lib/interface/IAbstractTransitionComponent';

class LatestTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const articles = <Array<IAbstractTransitionComponent>>this.viewModel.$refs.article;
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

		this.transitionInTimeline.add(this.getSubTimeline('ButtonQuaternary'), 0.2);

		if (articles) {
			articles.forEach((article, index) => {
				const duration = this.getSubTimelineDuration(`ArticleTeaser.${index}`);
				this.transitionInTimeline.add(this.getSubTimeline(`ArticleTeaser.${index}`), `-=${duration * 0.75}`);
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

export default LatestTransitionController;
