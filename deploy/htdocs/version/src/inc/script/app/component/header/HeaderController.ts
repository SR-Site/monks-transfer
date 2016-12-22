import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import HeaderTransitionController from 'app/component/header/HeaderTransitionController';
import IHeaderOptions from 'app/component/header/IHeaderOptions';
import HeaderViewModel from 'app/component/header/HeaderViewModel';

import Log from "lib/temple/util/Log";

class HeaderController extends DefaultComponentTransitionController<HeaderViewModel, IHeaderOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.Header');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new HeaderTransitionController(this.element, this);

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

export default HeaderController;
