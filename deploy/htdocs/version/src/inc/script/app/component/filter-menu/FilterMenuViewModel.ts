import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import FilterMenuController from 'app/component/filter-menu/FilterMenuController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';

import ko = require('knockout');
import CommonEvent from "../../../lib/temple/event/CommonEvent";

class FilterMenuViewModel extends DefaultComponentTransitionViewModel<FilterMenuController, IFilterMenuOptions>
{
	public filterOverlayIsOpen:KnockoutObservable<boolean> = ko.observable(false);
	public filters: KnockoutObservable<{[type: string]: Array<{label:string;value:string;checked:KnockoutObservable<boolean>}>}> = ko.observable(null);


	/**
	 * @public
	 * @method getFilterData
	 */
	public getFilterData():{[filterType:string]:string}
	{
		var filterData = {};

		// Loop through all filterTypes
		Object.keys(this.filters()).forEach((key, index) =>{

			// Find CHECKED options per filter type
			var chosenOptions = this.filters()[index].filter((option) => option.checked());

			// Create object[key] only if this filterType has chosen options.
			if(chosenOptions && chosenOptions.length > 0) {
				filterData[key] = [];

				chosenOptions.forEach((option) =>  filterData[key].push(option.value));
				filterData[key] = filterData[key].join(',');
			}
		});

		return filterData;
	}

	/**
	 * @public
	 * @method handleFilterOverlayLabelClick
	 */
	public handleFilterOverlayLabelClick():void
	{
		if(this.filterOverlayIsOpen())
		{
			this.controller.dispatch(CommonEvent.CHANGE, this.getFilterData());
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
