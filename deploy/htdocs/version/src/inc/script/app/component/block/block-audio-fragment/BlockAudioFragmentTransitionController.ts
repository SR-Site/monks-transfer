import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockAudioFragmentTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this._transitionInTimeline.from(this.element.querySelector('.heading'), 1,
			{ opacity: 0, y: 50, ease: Expo.easeOut }
		);

		this._transitionInTimeline.from(this.element.querySelector('.details'), 1,
			{ opacity: 0, y: 50, ease: Expo.easeOut }
		);

		this._transitionInTimeline.add(this.getSubTimeline(this.element.querySelector('.component-audio-player')));
	}
}

export default BlockAudioFragmentTransitionController;
