import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockImageCallToActionsController from "./BlockImageCallToActionsController";

class BlockImageCallToActionsTransitionController extends AbstractTransitionController<BlockImageCallToActionsController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const clipMasks = Array.prototype.slice.call(this.element.querySelectorAll('.clip-mask'));

		clipMasks.forEach((clipMask, index) =>
		{
			this.transitionInTimeline.fromTo(clipMask, 2,
				{
					y: 0,
					ease: Expo.easeOut
				},
				{
					y: this.element.offsetHeight + this.parentController.triangleSize,
					ease: Expo.easeOut,
					onComplete: () =>
					{
						TweenLite.set(clipMask, {display: 'none'})
					}
				}, index === 0 ? 0 : '=-1.6');
		})
	}
}

export default BlockImageCallToActionsTransitionController;
