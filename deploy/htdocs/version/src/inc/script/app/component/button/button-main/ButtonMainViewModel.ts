import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonMainController from 'app/component/button/button-main/ButtonMainController';
import IButtonMainOptions from 'app/component/button/button-main/IButtonMainOptions';

import ko = require('knockout');

class ButtonMainViewModel extends DefaultButtonViewModel<ButtonMainController, IButtonMainOptions>
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

export default ButtonMainViewModel;
