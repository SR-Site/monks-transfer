import { AbstractTransitionController } from 'vue-transition-component';
import IAbstractTransitionComponent from 'vue-transition-component/lib/interface/IAbstractTransitionComponent';

class LatestTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const articles = <Array<IAbstractTransitionComponent>>this.viewModel.$refs.article;
		this.transitionInTimeline.from(this.viewModel.$el.querySelector('.heading'), 0.8, {
			opacity: 0,
		});

		this.transitionInTimeline.add(this.getSubTimeline('ButtonQuaternary'), 0.2);

		if (articles) {
			articles.forEach((article, index) => {
				this.transitionInTimeline.add(this.getSubTimeline(`ArticleTeaser${index}`), 0.2);
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
