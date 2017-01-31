import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ProgramModuleItemController from 'app/component/program-module-item/ProgramModuleItemController';
import IProgramModuleItemOptions from 'app/component/program-module-item/IProgramModuleItemOptions';

import ko = require('knockout');

class ProgramModuleItemViewModel extends DefaultComponentTransitionViewModel<ProgramModuleItemController, IProgramModuleItemOptions>
{

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default ProgramModuleItemViewModel;
