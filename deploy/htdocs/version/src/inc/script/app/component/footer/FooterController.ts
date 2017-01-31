import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import FooterTransitionController from 'app/component/footer/FooterTransitionController';
import IFooterOptions from 'app/component/footer/IFooterOptions';
import FooterViewModel from 'app/component/footer/FooterViewModel';

import Log from "lib/temple/util/Log";

class FooterController extends AbstractTransitionComponentController<FooterViewModel, IFooterOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.Footer');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new FooterTransitionController(this.element, this);

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

export default FooterController;
