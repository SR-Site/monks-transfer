import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonCircleCloseController from 'app/component/button/button-circle-close/ButtonCircleCloseController';
import IButtonCircleCloseOptions from 'app/component/button/button-circle-close/IButtonCircleCloseOptions';

import ko = require('knockout');

class ButtonCircleCloseViewModel extends DefaultButtonViewModel<ButtonCircleCloseController, IButtonCircleCloseOptions>
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

export default ButtonCircleCloseViewModel;
