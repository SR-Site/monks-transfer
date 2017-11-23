import { AbstractTransitionController } from 'vue-transition-component';
import { Expo, Linear } from 'gsap';

class HeroQuinaryTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const heroQuaternaryComponent: any = this.viewModel;

		this.transitionInTimeline.fromTo(
			heroQuaternaryComponent.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
			},
		);
		this.transitionInTimeline.add(() => heroQuaternaryComponent.setCrossFaderBackground());
		this.transitionInTimeline.add(this.getSubTimeline('PrimaryTriangle'), 1);

		if (this.viewModel.$refs.image) {
			this.transitionInTimeline.fromTo(
				this.viewModel.$refs.image,
				0.4,
				{
					autoAlpha: 0,
				},
				{
					clearProps: 'all',
					autoAlpha: 1,
					ease: Linear.easeNone,
				},
			);
		}

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.heading,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				clearProps: 'all',
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'-=0.6',
		);

		this.transitionInTimeline.fromTo(
			this.viewModel.$refs.copy,
			0.8,
			{
				y: 50,
				autoAlpha: 0,
			},
			{
				y: 0,
				clearProps: 'all',
				autoAlpha: 1,
				ease: Expo.easeOut,
			},
			'-=0.6',
		);

		if (this.viewModel.hasChild('ButtonQuinary')) {
			this.transitionInTimeline.fromTo(
				(<any>this.viewModel.$refs.button).$el,
				0.8,
				{
					y: 50,
					autoAlpha: 0,
				},
				{
					y: 0,
					clearProps: 'all',
					autoAlpha: 1,
					ease: Expo.easeOut,
				},
				'-=0.6',
			);
		}
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default HeroQuinaryTransitionController;
