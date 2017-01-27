import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";
import Promise = require("bluebird");

class BlockHeroMainTransitionController extends DefaultTransitionController
{
	private _mainTriangleAnimation: TriangleTransitionController;

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._mainTriangleAnimation = new TriangleTransitionController(
			<HTMLElement>this.element.querySelector('.background-triangle'),
			this.parentController
		);
	}

	/**
	 * @public
	 * @method transitionInNextSlide
	 */
	public transitionInNextSlide(newIndex: number): Promise<any>
	{
		this.parentController.changeBackgroundImage(newIndex);

		return this._mainTriangleAnimation.transitionOut()
			.then(() => console.log('transition out complete'))
			.then(() => this._mainTriangleAnimation.transitionIn())
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			opacity: 0
		});

		this.transitionInTimeline.add(
			() => this.parentController.changeBackgroundImage(this.parentController.activeIndex)
		);

		this.transitionInTimeline.add(() =>
		{
			this._mainTriangleAnimation.transitionIn()
		});
	}
}

export default BlockHeroMainTransitionController;



