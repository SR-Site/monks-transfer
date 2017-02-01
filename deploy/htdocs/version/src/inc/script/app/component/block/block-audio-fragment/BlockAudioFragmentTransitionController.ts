import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockAudioFragmentController from "./BlockAudioFragmentController";

class BlockAudioFragmentTransitionController extends AbstractTransitionController<BlockAudioFragmentController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element.querySelector('.heading'), 1,
			{ opacity: 0, y: 50, ease: Expo.easeOut }
		);

		this.transitionInTimeline.from(this.element.querySelector('.details'), 1,
			{ opacity: 0, y: 50, ease: Expo.easeOut }
		);

		this.transitionInTimeline.add(this.getSubTimeline(this.element.querySelector('.component-audio-player')));
	}
}

export default BlockAudioFragmentTransitionController;
