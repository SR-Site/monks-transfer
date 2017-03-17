import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import FilterMenuController from "./FilterMenuController";
import Promise = require("bluebird");

class FilterMenuTransitionController extends AbstractTransitionController<FilterMenuController>
{
	private _dropDownTimelines: Array<{
		completeMethod: () => void,
		timeline: TimelineLite
	}> = [];

	constructor(element: HTMLElement, parentController: FilterMenuController)
	{
		super(element, parentController);

		this.setupDropdownTimeline();
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			opacity: 0,
			ease: Linear.easeNone
		});
	}

	/**
	 * @public
	 * @method setupDropdownTimeline
	 */
	public setupDropdownTimeline(): void
	{
		const dropDownElements = Array.prototype.slice.call(this.element.querySelectorAll('.filter-item'));

		dropDownElements.forEach((element: HTMLElement, index: number) =>
		{
			let timeline = new TimelineLite({
				paused: true,
				onComplete: () =>
				{
					this.handleDropDownAnimationComplete(index)
				},
				onReverseComplete: () =>
				{
					this.handleDropDownAnimationComplete(index)
				}
			});

			timeline.to(element, 0.25, {className: '+=is-hover', ease: Expo.easeInOut}, 0);
			timeline.to(element.querySelector('.filter-dropdown'), 0.25, {
				className: '+=is-open',
				ease: Expo.easeInOut
			}, 0);

			this._dropDownTimelines.push({
				timeline: timeline,
				completeMethod: null
			});
		})
	}

	/**
	 * @private
	 * @method handleDropDownAnimationComplete
	 */
	private handleDropDownAnimationComplete(index: number): void
	{
		let transitionObject = this._dropDownTimelines[index];

		if(transitionObject && transitionObject.completeMethod)
		{
			transitionObject.completeMethod();

			// Reset the complete method
			this._dropDownTimelines[index].completeMethod = null;
		}
	}

	/**
	 * @public
	 * @method
	 */
	public showDropDown(index: number): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{
			this._dropDownTimelines[index].completeMethod = resolve;
			this._dropDownTimelines[index].timeline.restart();
		})
	}

	/**
	 * @public
	 * @method hideDropDown
	 */
	public hideDropDown(index: number): Promise<any>
	{
		return new Promise((resolve: () => void, reject: () => void) =>
		{
			this._dropDownTimelines[index].completeMethod = resolve;
			this._dropDownTimelines[index].timeline.reverse()
		})
	}
}

export default FilterMenuTransitionController;
