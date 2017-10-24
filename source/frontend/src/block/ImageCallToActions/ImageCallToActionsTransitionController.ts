import { AbstractTransitionController } from 'vue-transition-component';
import { DeviceState } from 'config/deviceStateConfig';
import { TweenLite, Linear, Expo } from 'gsap';

class ImageCallToActionsTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		const imageCallToActionsComponent = <any>this.viewModel;
		const triangleSize = imageCallToActionsComponent.triangleSize;
		const targetY = this.viewModel.$el.offsetHeight + triangleSize;

		if (imageCallToActionsComponent.$deviceState.currentState > DeviceState.SMALL) {
			(imageCallToActionsComponent.$refs.clipMask).forEach((element, index) => {
				this.transitionInTimeline.fromTo(
					element,
					2,
					{
						y: 0,
					},
					{
						y: targetY,
						ease: Expo.easeOut,
						onComplete: () => {
							TweenLite.set(
								element,
								{
									display: 'none',
								},
							);
						},
					},
					index === 0 ? 0 : '=-1.6',
				);
			});
		} else {
			this.transitionInTimeline.fromTo(
				this.viewModel.$el,
				1,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					ease: Linear.easeNone,
				},
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

export default ImageCallToActionsTransitionController;
