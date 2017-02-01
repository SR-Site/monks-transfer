import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";
import BlockQuoteController from "./BlockQuoteController";

class BlockQuoteTransitionController extends AbstractTransitionController<BlockQuoteController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const desktopLayout = DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL;
		const image = this.element.querySelector('.image-placeholder');
		const heading = this.element.querySelector('.heading');
		const copy = this.element.querySelector((desktopLayout ? 'aside ' : '.image-placeholder ') + '.copy');

		this.transitionInTimeline.from(this.element, 0.5, { opacity: 0, clearProps: "al" });
		this.transitionInTimeline.from(image, 0.5, { opacity: 0, clearProps: "al" });
		this.transitionInTimeline.from(heading, 0.5, { opacity: 0, x: 100, ease: Expo.easeOut, clearProps: "al" }, '=-0.3');
		this.transitionInTimeline.from(copy, 0.5, { opacity: 0, x: 100, ease: Expo.easeOut, clearProps: "al" }, '=-0.3');
	}
}

export default BlockQuoteTransitionController;
