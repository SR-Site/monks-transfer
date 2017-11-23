import { AbstractTransitionController } from 'vue-transition-component';
import { Quad } from 'gsap';

class HeroMainSlideTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const heroMainComponent: any = this.viewModel;

		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			0.01,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				clearProps: 'all',
			},
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.6,
			{
				y: 30,
				autoAlpha: 0,
			},
			{
				y: 0,
				autoAlpha: 1,
				clearProps: 'all',
				ease: Quad.easeOut,
			},
		);

		if (this.viewModel.$refs.copy) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.copy,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					clearProps: 'all',
					ease: Quad.easeOut,
				},
				'-=0.5',
			);
		}

		if (this.viewModel.$refs.buttonLink) {
			this.transitionInTimeline.fromTo(
				(<any>this.viewModel.$refs.buttonLink).$el,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					clearProps: 'all',
					ease: Quad.easeOut,
				},
				'-=0.5',
			);
		}

		if (this.viewModel.$refs.buttonNext) {
			this.transitionInTimeline.fromTo(
				(<any>this.viewModel.$refs.buttonNext).$el,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					clearProps: 'all',
					ease: Quad.easeOut,
				},
				'-=0.5',
			);
		}

		if (this.viewModel.$refs.statisticHeading) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.statisticHeading,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
				},
				{
					y: 0,
					autoAlpha: 1,
					ease: Quad.easeOut,
				},
				'-=0.5',
			);
		}

		if (this.viewModel.$refs.statistic) {
			(<Array<HTMLElement>>this.viewModel.$refs.statistic).forEach(statistic => {
				this.transitionInTimeline.fromTo(
					statistic,
					0.6,
					{
						y: 30,
						autoAlpha: 0,
					},
					{
						y: 0,
						autoAlpha: 1,
						ease: Quad.easeOut,
					},
					'-=0.5',
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

export default HeroMainSlideTransitionController;
