import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import SentenceTransitionController from "../../../util/component-transition/SentenceTransitionController";

class BlockImageWithContentTransitionController extends DefaultTransitionController
{

	private _headingAnimation: SentenceTransitionController;
	private _copyAnimation: SentenceTransitionController;

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._headingAnimation = new SentenceTransitionController(
			<HTMLElement>this.element.querySelector('.heading'),
			this.parentController
		);

		this._copyAnimation = new SentenceTransitionController(
			<HTMLElement>this.element.querySelector('.copy'),
			this.parentController
		);
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.add(this._headingAnimation.getTimeline());
		this.transitionInTimeline.add(this._copyAnimation.getTimeline());

		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button));
		}
	}
}

export default BlockImageWithContentTransitionController;
