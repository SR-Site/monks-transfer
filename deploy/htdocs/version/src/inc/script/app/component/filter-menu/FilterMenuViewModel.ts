import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import FilterMenuController from 'app/component/filter-menu/FilterMenuController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';

import ko = require('knockout');

class FilterMenuViewModel extends DefaultComponentTransitionViewModel<FilterMenuController, IFilterMenuOptions>
{
	public filterOverlayIsOpen:KnockoutObservable<boolean> = ko.observable(false);
	/**
	 * @public
	 * @method handleFilterOverlayLabelClick
	 */
	public handleFilterOverlayLabelClick():void
	{
		if(this.filterOverlayIsOpen())
		{
			console.log('fireEvent apply Filter!');
		}

		this.toggleFilterOverlay();
	}

	/**
	 * @public
	 * @method toggleFilterOverlay
	 */
	public toggleFilterOverlay():void
	{
		this.filterOverlayIsOpen(!this.filterOverlayIsOpen());
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default FilterMenuViewModel;
