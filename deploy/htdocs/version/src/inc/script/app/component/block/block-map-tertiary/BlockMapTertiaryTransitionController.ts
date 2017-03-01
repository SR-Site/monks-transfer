import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import BlockMapTertiaryController from 'app/component/block/block-map-tertiary/BlockMapTertiaryController';

class BlockMapTertiaryTransitionController extends AbstractTransitionController<BlockMapTertiaryController>
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

		this.transitionInTimeline.add(() => this.parentController.activeSlide.transitionIn());
	}
}

export default BlockMapTertiaryTransitionController;
