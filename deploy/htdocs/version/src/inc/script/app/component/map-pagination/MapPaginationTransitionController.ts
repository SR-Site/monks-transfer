import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import MapPaginationController from 'app/component/map-pagination/MapPaginationController';

class MapPaginationTransitionController extends AbstractTransitionController<MapPaginationController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		});
	}
}

export default MapPaginationTransitionController;
