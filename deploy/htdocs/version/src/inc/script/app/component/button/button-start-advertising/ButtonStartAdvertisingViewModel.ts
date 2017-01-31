import DefaultButtonViewModel from "../AbstractButtonViewModel";
import ButtonStartAdvertisingController from 'app/component/button/button-start-advertising/ButtonStartAdvertisingController';
import IButtonStartAdvertisingOptions from 'app/component/button/button-start-advertising/IButtonStartAdvertisingOptions';

import ko = require('knockout');

class ButtonStartAdvertisingViewModel extends DefaultButtonViewModel<ButtonStartAdvertisingController, IButtonStartAdvertisingOptions>
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

export default ButtonStartAdvertisingViewModel;
