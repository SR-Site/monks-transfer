import { AbstractTransitionController } from 'vue-transition-component';
import { Expo } from 'gsap';
import IAbstractTransitionComponent from 'vue-transition-component/lib/interface/IAbstractTransitionComponent';

class ArticleTeaserTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const el = this.viewModel.$el;
		const clipSize = (<HTMLElement>this.viewModel.$refs.description).offsetWidth;

		this.transitionInTimeline.fromTo(
			el,
			0.5,
			{
				opacity: 0,
			},
			{
				opacity: 1,
			},
			0,
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.image,
			1.6,
			{
				clip: `rect(0, ${el.offsetWidth}, ${el.offsetHeight}, ${el.offsetWidth})`,
				opacity: 0,
			},
			{
				clip: `rect(0, ${el.offsetWidth}, ${el.offsetHeight}, ${clipSize})`,
				opacity: 1,
				clearProps: 'clip, opacity',
				ease: Expo.easeOut,
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			1,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				clearProps: 'opacity',
			},
			'=-0.8',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			1,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				clearProps: 'opacity',
			},
			'=-0.8',
		);

		if (this.viewModel.$refs.tag) {
			(<Array<IAbstractTransitionComponent>>this.viewModel.$refs.tag).forEach((tag, index) => {
				const componentId = `ButtonTag${index}`;

				this.transitionInTimeline.add(
					this.getSubTimeline(componentId),
					`=-${this.getSubTimelineDuration(componentId) * 0.8}`,
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

export default ArticleTeaserTransitionController;
