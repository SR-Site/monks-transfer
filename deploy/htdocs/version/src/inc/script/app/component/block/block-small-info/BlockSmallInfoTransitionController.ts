import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockSmallInfoController from "./BlockSmallInfoController";

class BlockSmallInfoTransitionController extends AbstractTransitionController<BlockSmallInfoController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		let heading = this.element.querySelector('.heading');
		let copy = this.element.querySelector('.copy');
		let button = this.element.querySelector('.component-button-main');

		// Run the text animation
		this.transitionInTimeline.from(heading, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=+0.5');

		if( copy ) this.transitionInTimeline.from(copy, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=-0.7');
		if( button ) this.transitionInTimeline.from(button, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=-0.7');
	}
}

export default BlockSmallInfoTransitionController;
