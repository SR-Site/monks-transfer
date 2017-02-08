import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockImageCallToActionsController from "./BlockImageCallToActionsController";

class BlockImageCallToActionsTransitionController extends AbstractTransitionController<BlockImageCallToActionsController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	// protected setupTransitionInTimeline(): void
	// {
	// 	const callToActionImages = Array.prototype.slice.call(this.element.querySelectorAll('.call-to-action-image'));
	// 	const elementHeight: number = this.element.offsetHeight;
	// 	let left: number = 0;
	//
	// 	// Default size
	// 	let elementWidth: number = this.element.offsetWidth / callToActionImages.length;
	//
	// 	callToActionImages.forEach((callToActionImage, index) =>
	// 	{
	// 		let right: number = left + elementWidth;
	//
	// 		this.transitionInTimeline.fromTo(callToActionImage, 1,
	// 			{
	// 				clip: 'rect(0px, ' + right + 'px, ' + 0 + 'px, ' + left + 'px)',
	// 				ease: Expo.easeOut
	// 			},
	// 			{
	// 				clip: 'rect(0px, ' + right + 'px, ' + elementHeight + 'px, ' + left + 'px)',
	// 				ease: Expo.easeOut
	// 			});
	//
	// 		left += elementWidth
	// 	})
	// }
}

export default BlockImageCallToActionsTransitionController;
