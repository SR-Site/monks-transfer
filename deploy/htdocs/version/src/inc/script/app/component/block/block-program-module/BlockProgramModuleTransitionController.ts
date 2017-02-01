import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockProgramModuleController from "./BlockProgramModuleController";

class BlockProgramModuleTransitionController extends AbstractTransitionController<BlockProgramModuleController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class if it's not overwritten it will use the default transition which is a fade
	 */
	protected setupTransitionInTimeline(): void
	{
		const modules: Array<HTMLElement> = Array.prototype.slice.call(this.element.querySelectorAll('.component-program-module-item'));

		Array.from(modules).forEach((element: HTMLElement, index: number) =>
		{
			this.transitionInTimeline.add(this.getSubTimeline(element))
		});
	}
}

export default BlockProgramModuleTransitionController;
