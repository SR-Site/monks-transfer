import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import FilterMenuTransitionController from 'app/component/filter-menu/FilterMenuTransitionController';
import IFilterMenuOptions from 'app/component/filter-menu/IFilterMenuOptions';
import FilterMenuViewModel from 'app/component/filter-menu/FilterMenuViewModel';

import Log from "lib/temple/util/Log";

class FilterMenuController extends DefaultComponentTransitionController<FilterMenuViewModel, IFilterMenuOptions>
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

		this._debug.log('Init');

		this.transitionController = new FilterMenuTransitionController(this.element, this);

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
