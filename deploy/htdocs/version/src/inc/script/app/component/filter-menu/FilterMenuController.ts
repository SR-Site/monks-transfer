import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import FilterMenuTransitionController from 'app/component/filter-menu/FilterMenuTransitionController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';
import FilterMenuViewModel from 'app/component/filter-menu/FilterMenuViewModel';

import Log from "lib/temple/util/Log";

class FilterMenuController extends AbstractTransitionComponentController<FilterMenuViewModel, IFilterMenuOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.FilterMenu');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this.setupFilters();

		this.destructibles.addKOSubscription(this.viewModel.selectedFiltersOptionCount.subscribe(() => this.handleFilterChange()));

		this._debug.log('Init');

		this.transitionController = new FilterMenuTransitionController(this.element, this);
	}

	/**
	 * @private
	 * @method handleFilterChange
	 */
	private handleFilterChange():void
	{
		this.viewModel.filterChanged(true);
	}

	/**
	 * @private
	 * @method setupFilters
	 */
	private setupFilters():void
	{
		let filters = {};
		this.viewModel.data.filters.forEach((filter:{type:number;options:Array<{value:string;label:string;}>}) =>{
			filters[filter.type] = [];

			filter.options.forEach((option:{value:string;label:string;}) =>{
				filters[filter.type].push({
					label: option.label,
					value: option.value,
					checked: ko.observable(false)
				});
			});
		});

		this.viewModel.filters(filters);
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default FilterMenuController;
