import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonMenuController from 'app/component/button/button-menu/ButtonMenuController';
import IButtonMenuOptions from 'app/component/button/button-menu/IButtonMenuOptions';

import ko = require('knockout');

class ButtonMenuViewModel extends DefaultButtonViewModel<ButtonMenuController, IButtonMenuOptions>
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

export default ButtonMenuViewModel;
