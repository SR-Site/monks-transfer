import AbstractButtonViewModel from "../AbstractButtonViewModel";
import ButtonHeaderController from 'app/component/button/button-header/ButtonHeaderController';
import IButtonHeaderOptions from 'app/component/button/button-header/IButtonHeaderOptions';

import ko = require('knockout');

class ButtonHeaderViewModel extends AbstractButtonViewModel<ButtonHeaderController, IButtonHeaderOptions>
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

export default ButtonHeaderViewModel;
