import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";
import TriangleTransitionController from "../../../util/component-transition/TriangleTransitionController";

class BlockHeroSecondaryTransitionController extends DefaultTransitionController
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
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		let heading = this.element.querySelector('.heading');
		let copy = this.element.querySelector('.copy');
		let button = this.element.querySelector('.component-button-circle-arrow');

		this.transitionInTimeline.from(this.element, 0.5, { opacity: 0 });

		// Run the background switch
		this.transitionInTimeline.add(() => this.parentController.changeBackgroundImage(), 0);

		// Slide in the main triangle
		this.transitionInTimeline.add(() => this._mainTriangleAnimation.getTransitionInTimeline().play(), '=+0.5');

		// Run the text animation
		this.transitionInTimeline.from(heading, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=+0.5');

		if( copy ) this.transitionInTimeline.from(copy, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=-0.7');
		if( button ) this.transitionInTimeline.from(button, 0.8, { y: 50, autoAlpha: 0, ease: Expo.easeOut }, '=-0.7');

		// Slide in the secondary triangle
		this.transitionInTimeline.from(this.element.querySelector('.secondary-background-triangle'), 1.5, {
			x: window.innerWidth,
			y: -window.innerWidth,
			ease: Expo.easeOut
		}, '=-1');
	}
}

export default BlockHeroSecondaryTransitionController;
