import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockPathToPurchaseController from "./BlockPathToPurchaseController";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";

class BlockPathToPurchaseTransitionController extends AbstractTransitionController<BlockPathToPurchaseController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const mobilePagination = this.element.querySelector('.component-paginator-dashed');


		this.transitionInTimeline.from(this.element, 1, {
			opacity: 0
		});

		if(mobilePagination && DataManager.getInstance().deviceStateTracker.currentState() <= DeviceState.SMALL)
		{
			this.transitionInTimeline.add(this.getSubTimeline(mobilePagination));
		}
	}
}

export default BlockPathToPurchaseTransitionController;
