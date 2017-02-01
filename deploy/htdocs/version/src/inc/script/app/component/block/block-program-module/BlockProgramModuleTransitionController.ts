import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockProgramModuleTransitionController extends AbstractTransitionController
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
			this._transitionInTimeline.add(this.getSubTimeline(element))
		});
	}
}

export default BlockProgramModuleTransitionController;
