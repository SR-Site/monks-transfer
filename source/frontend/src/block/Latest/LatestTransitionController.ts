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

		this.transitionInTimeline.add(this.getSubTimeline('ButtonPrimary'), '=-0.2');

		if (articles) {
			articles.forEach((article, index) => {
				const componentId = `ArticleTeaser${index}`;

				this.transitionInTimeline.add(
					this.getSubTimeline(componentId),
					index * 0.25,
				);
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

export default LatestTransitionController;
