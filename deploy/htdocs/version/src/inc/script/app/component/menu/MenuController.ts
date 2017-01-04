import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import MenuTransitionController from 'app/component/menu/MenuTransitionController';
import IMenuOptions from 'app/component/menu/IMenuOptions';
import MenuViewModel from 'app/component/menu/MenuViewModel';

import Log from "lib/temple/util/Log";

class MenuController extends DefaultComponentTransitionController<MenuViewModel, IMenuOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.Menu');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new MenuTransitionController(this.element, this);

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

export default MenuController;
