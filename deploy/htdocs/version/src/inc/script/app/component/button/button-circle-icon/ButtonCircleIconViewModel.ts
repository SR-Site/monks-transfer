import AbstractButtonViewModel from "../AbstractButtonViewModel";
import ButtonCircleIconController from 'app/component/button/button-circle-icon/ButtonCircleIconController';
import IButtonCircleIconOptions from 'app/component/button/button-circle-icon/IButtonCircleIconOptions';

import ko = require('knockout');

class ButtonCircleIconViewModel extends AbstractButtonViewModel<ButtonCircleIconController, IButtonCircleIconOptions>
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

export default ButtonCircleIconViewModel;
