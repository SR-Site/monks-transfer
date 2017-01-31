import DefaultButtonViewModel from "../AbstractButtonViewModel";
import ButtonTagController from 'app/component/button/button-tag/ButtonTagController';
import IButtonTagOptions from 'app/component/button/button-tag/IButtonTagOptions';

import ko = require('knockout');

class ButtonTagViewModel extends DefaultButtonViewModel<ButtonTagController, IButtonTagOptions>
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

export default ButtonTagViewModel;
