import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import FilterMenuTransitionController from 'app/component/filter-menu/FilterMenuTransitionController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';
import FilterMenuViewModel from 'app/component/filter-menu/FilterMenuViewModel';

import Log from "lib/temple/util/Log";
import Scrollbar from "../../../lib/temple/component/Scrollbar";

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
		this.viewModel.data.filters.forEach((filter: {type: number;options: Array<{value: string;label: string;}>}) =>
		{
			filters[filter.type] = [];

			filter.options.forEach((option: {value: string;label: string;}) =>
			{
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
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default FilterMenuController;
