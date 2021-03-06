import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import PaginatorDashedTransitionController from 'app/component/paginator-dashed/PaginatorDashedTransitionController';
import IPaginatorDashedOptions from 'app/component/paginator-dashed/IPaginatorDashedOptions';
import PaginatorDashedViewModel from 'app/component/paginator-dashed/PaginatorDashedViewModel';

import Log from "lib/temple/util/Log";

class PaginatorDashedController extends AbstractTransitionComponentController<PaginatorDashedViewModel, IPaginatorDashedOptions, PaginatorDashedTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.PaginatorDashed');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new PaginatorDashedTransitionController(this.element, this);

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

export default PaginatorDashedController;
