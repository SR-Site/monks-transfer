import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import ProgramModuleItemTransitionController from 'app/component/program-module-item/ProgramModuleItemTransitionController';
import IProgramModuleItemOptions from 'app/component/program-module-item/IProgramModuleItemOptions';
import ProgramModuleItemViewModel from 'app/component/program-module-item/ProgramModuleItemViewModel';

import Log from "lib/temple/util/Log";

class ProgramModuleItemController extends AbstractTransitionComponentController<ProgramModuleItemViewModel, IProgramModuleItemOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ProgramModuleItem');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new ProgramModuleItemTransitionController(this.element, this);
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

export default ProgramModuleItemController;
