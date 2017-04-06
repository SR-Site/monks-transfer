import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import FilterMenuTransitionController from 'app/component/filter-menu/FilterMenuTransitionController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';
import FilterMenuViewModel from 'app/component/filter-menu/FilterMenuViewModel';

import Log from "lib/temple/util/Log";
import Scrollbar from "../../../lib/temple/component/Scrollbar";
import {trackEvent} from "../../util/Analytics";

class FilterMenuController extends AbstractTransitionComponentController<FilterMenuViewModel, IFilterMenuOptions, FilterMenuTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.FilterMenu');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this.setupFilters();

		this.destructibles.addKOSubscription(this.viewModel.selectedFiltersOptionCount.subscribe(() => this.handleFilterChange()));
		this.destructibles.addKOSubscription(this.viewModel.filterOverlayIsOpen.subscribe(() =>
		{
			// Small delay
			setTimeout(this.updateCustomScrollbar.bind(this), 200);
		}));

		this._debug.log('Init');

		this.transitionController = new FilterMenuTransitionController(this.element, this);
	}

	/**
	 * @public
	 * @method setFilters
	 * @param tags
	 */
	public setFilters(targetFilters: { [type: string]: Array<{ label: string; value: string; }> }): void
	{
		const filters = this.viewModel.filters();

		Object.keys(targetFilters).forEach((type) =>
		{
			targetFilters[type].forEach((targetFilter) =>
			{
				filters[type].find((filter) => filter.value === targetFilter.value).checked(true);
			});
		});

		// Apply the filters
		this.viewModel.applyFilter();
	}

	/**
	 * @private
	 * @method handleFilterChange
	 */
	private handleFilterChange(): void
	{
		this.viewModel.filterChanged(true);
	}

	/**
	 * @protected
	 * @method updateCustomScrollbar
	 */
	protected updateCustomScrollbar(): void
	{
		const scrollWrapper = this.getCustomScrollbar();

		if(scrollWrapper)
		{
			scrollWrapper.update();
		}
	}

	public getCustomScrollbar(): Scrollbar
	{
		return ko.utils.domData.get(this.getCustomScrollElement(), Scrollbar.BINDING_NAME);
	}

	/**
	 * @private
	 * @method getCustomScrollElement
	 */
	private getCustomScrollElement(): HTMLElement
	{
		return <HTMLElement>this.element.querySelector('.js-scroll-wrapper');
	}

	/**
	 * @private
	 * @method setupFilters
	 */
	private setupFilters(): void
	{
		let filters = {};
		this.viewModel.data.filters.forEach((filter: { type: number; label:string; options: Array<{ value: string; label: string; }> }) =>
		{
			filters[filter.type] = [];

			filter.options.forEach((option: { value: string; label: string; }) =>
			{
				const newFilter = {
					label: option.label,
					value: option.value,
					checked: ko.observable(false)
				};

				// Listen to the change
				this.destructibles.addKOSubscription(newFilter.checked.subscribe((checked) =>
				{
					if(checked)
					{
						trackEvent('filterContent', 'click', 'filter|' + filter.label + '|' + option.label)
					}
				}))

				// Save the new filter
				filters[filter.type].push(newFilter);
			});
		});

		this.viewModel.filters(filters);
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default FilterMenuController;
