import AbstractButtonViewModel from "../AbstractButtonViewModel";
import ButtonSecondaryController from 'app/component/button/button-secondary/ButtonSecondaryController';
import IButtonSecondaryOptions from 'app/component/button/button-secondary/IButtonSecondaryOptions';

import ko = require('knockout');

class ButtonSecondaryViewModel extends AbstractButtonViewModel<ButtonSecondaryController, IButtonSecondaryOptions>
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

export default ButtonSecondaryViewModel;
