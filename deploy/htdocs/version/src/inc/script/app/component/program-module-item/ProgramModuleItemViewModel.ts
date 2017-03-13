import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ProgramModuleItemController from 'app/component/program-module-item/ProgramModuleItemController';
import IProgramModuleItemOptions from 'app/component/program-module-item/IProgramModuleItemOptions';

import ko = require('knockout');
import StringUtils from "../../../lib/temple/util/type/StringUtils";

class ProgramModuleItemViewModel extends DefaultComponentTransitionViewModel<ProgramModuleItemController, IProgramModuleItemOptions>
{

	public StringUtils:Class = StringUtils;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.StringUtils = null;

		// always call this last
		super.destruct();
	}
}

export default ProgramModuleItemViewModel;
