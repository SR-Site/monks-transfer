import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";

class BlockImageCarouselTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const pagination = this.element.querySelector('.pagination');
		const mobilePagination = this.element.querySelector('.component-paginator-dashed');

		this.transitionInTimeline.from(this.element.querySelector('.slider-viewport'), 1, {
			opacity: 0
		});

		if(pagination && DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL)
		{
			this.transitionInTimeline.from(pagination, 1, {
				opacity: 0
			})
		}
		else if(mobilePagination && DataManager.getInstance().deviceStateTracker.currentState() <= DeviceState.SMALL)
		{
			this.transitionInTimeline.add(this.getSubTimeline(mobilePagination));
		}
	}
}

export default BlockImageCarouselTransitionController;
