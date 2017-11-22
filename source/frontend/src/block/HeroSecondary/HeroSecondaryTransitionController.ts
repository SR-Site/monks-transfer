import { AbstractTransitionController } from 'vue-transition-component';
import { Quad } from 'gsap';

class HeroSecondaryTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const heroTertiaryComponent: any = this.viewModel;

		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
			},
		);

		this.transitionInTimeline.add(() => heroTertiaryComponent.setCrossFaderBackground());
		this.transitionInTimeline.add(this.getSubTimeline('PrimaryTriangle'));
		this.transitionInTimeline.add(this.getSubTimeline('SecondaryTriangle'));

		if (this.viewModel.$refs.subHeading) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.subHeading,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut,
				},
				{
					y: 0,
					autoAlpha: 1,
				},
				'-=0.4',
			);
		}

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.6,
			{
				y: 30,
				autoAlpha: 0,
				ease: Quad.easeOut,
			},
			{
				y: 0,
				autoAlpha: 1,
			},
			'-=0.4',
		);

		if (this.viewModel.$refs.copy) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.copy,
				0.6,
				{
					y: 30,
					autoAlpha: 0,
					ease: Quad.easeOut,
				},
				{
					y: 0,
					autoAlpha: 1,
				},
				'-=0.4',
			);
		}

		if (this.viewModel.hasChild('ButtonCircleArrow')) {
			this.transitionInTimeline.add(this.getSubTimeline('ButtonCircleArrow'), '-=0.4');
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default HeroSecondaryTransitionController;
