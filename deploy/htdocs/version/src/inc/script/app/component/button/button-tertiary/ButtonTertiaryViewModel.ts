import AbstractButtonViewModel from "../AbstractButtonViewModel";
import ButtonTertiaryController from 'app/component/button/button-tertiary/ButtonTertiaryController';
import IButtonTertiaryOptions from 'app/component/button/button-tertiary/IButtonTertiaryOptions';

import ko = require('knockout');

class ButtonTertiaryViewModel extends AbstractButtonViewModel<ButtonTertiaryController, IButtonTertiaryOptions>
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

export default ButtonTertiaryViewModel;
