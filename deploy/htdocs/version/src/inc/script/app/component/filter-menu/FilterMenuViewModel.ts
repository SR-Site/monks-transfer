import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import FilterMenuController from 'app/component/filter-menu/FilterMenuController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';

import ko = require('knockout');
import CommonEvent from "../../../lib/temple/event/CommonEvent";

class FilterMenuViewModel extends DefaultComponentTransitionViewModel<FilterMenuController, IFilterMenuOptions>
{
	public activeDropdownIndex: KnockoutObservable<number> = ko.observable(null);
	public filterOverlayIsOpen: KnockoutObservable<boolean> = ko.observable(false);

	public filterChanged: KnockoutObservable<boolean> = ko.observable(false);

	public filters: KnockoutObservable<{[type: string]: Array<{label: string;value: string;checked: KnockoutObservable<boolean>}>}> = ko.observable(null);
	public selectedFiltersOptionCount: KnockoutComputed<Array<number>> = ko.computed(() =>
	{
		let countArray = [];

		if(this.filters())
		{
			Object.keys(this.filters()).forEach((key, index) =>
			{
				countArray.push(this.filters()[key].filter((option) => option.checked()).length)
			});
		}

		return countArray;
	});


	/**
	 * @public
	 * @method getFilterData
	 */
	public getFilterData(): {[filterType: string]: string}
	{
		let filterData = {};

		// Loop through all filterTypes
		Object.keys(this.filters()).forEach((key, index) =>
		{

			// Find CHECKED options per filter type
			let chosenOptions = this.filters()[key].filter((option) => option.checked());

			// Create object[key] only if this filterType has chosen options.
			if(chosenOptions && chosenOptions.length > 0)
			{
				filterData[key] = [];

				chosenOptions.forEach((option) => filterData[key].push(option.value));
				filterData[key] = filterData[key].join(',');
			}
		});

		return filterData;
	}

	/**
	 * @public
	 * @method handleDropdownClick
	 */
	public handleDropdownClick(index: number): void
	{
		const oldIndex = this.activeDropdownIndex();

		// Close if clicked twice
		if(index === this.activeDropdownIndex())
		{
			this.handleCloseDropdownClick(index);
			return;
		}

		// Update the active dropDownIndex
		this.activeDropdownIndex(index);

		if(typeof oldIndex === 'number')
		{
			this.controller.transitionController.hideDropDown(oldIndex)
				.then(() => this.controller.transitionController.showDropDown(index))
		}
		else
		{
			this.controller.transitionController.showDropDown(index);
		}
	}

	/**
	 * @public
	 * @method handleCloseDropdownClick
	 */
	public handleCloseDropdownClick(index: number): void
	{
		this.controller.transitionController.hideDropDown(index);
		this.activeDropdownIndex(null);
	}

	/**
	 * @public
	 * @method handleFilterOverlayLabelClick
	 */
	public handleFilterOverlayLabelClick(): void
	{
		if(this.filterOverlayIsOpen())
		{
			this.applyFilter();
		}

		this.toggleFilterOverlay();
	}

	/**
	 * @public
	 * @method applyFilter
	 */
	public applyFilter(): void
	{
		this.controller.dispatch(CommonEvent.CHANGE, this.getFilterData());
		this.filterChanged(false);
	}

	/**
	 * @public
	 * @method resetFilter
	 */
	public resetFilter(): void
	{
		// Only apply reset if any filter is set.
		if(Object.keys(this.getFilterData()).length > 0)
		{
			Object.keys(this.filters()).forEach((key, index) =>
			{
				this.filters()[key].map((option) => option.checked(false));
			});
		}
	}

	/**
	 * @public
	 * @method toggleFilterOverlay
	 */
	public toggleFilterOverlay(): void
	{
		this.filterOverlayIsOpen(!this.filterOverlayIsOpen());
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default FilterMenuViewModel;
