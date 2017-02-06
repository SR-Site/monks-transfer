import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import MenuController from "./MenuController";
import Promise = require("bluebird");

class MenuTransitionController extends AbstractTransitionController<MenuController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.set(this.element, {x: 0});

		this.transitionInTimeline.from(this.element.querySelector('.menu-background'), 1.2, {
			xPercent: 100,
			yPercent: -100,
			rotation: -45,
			ease: Power3.easeOut
		});

		Array.prototype.slice.call(this.element.querySelectorAll('.menu-item')).forEach((menuItem, index) =>
		{
			this.transitionInTimeline.from(menuItem, 1.5, {
				xPercent: 50,
				autoAlpha: 0,
				ease: Expo.easeOut
			}, index === 0 ? '=-0.8' : '=-1.45')
		})
	}

	/**
	 * @public
	 * @method transitionIn
	 * @returns {Promise<any>}
	 */
	public transitionIn(): Promise<any>
	{
		this.transitionInTimeline.timeScale(1);

		return super.transitionIn();
	}

	/**
	 * @public
	 * @method transitionOut
	 * @returns {Promise<any>}
	 */
	public transitionOut(): Promise<any>
	{
		this.transitionInTimeline.timeScale(2.5);

		return super.transitionOut();
	}
}

export default MenuTransitionController;
