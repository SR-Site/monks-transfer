import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonCallToReachController from 'app/component/button/button-call-to-reach/ButtonCallToReachController';
import IButtonCallToReachOptions from 'app/component/button/button-call-to-reach/IButtonCallToReachOptions';

import ko = require('knockout');

class ButtonCallToReachViewModel extends DefaultButtonViewModel<ButtonCallToReachController, IButtonCallToReachOptions>
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

export default ButtonCallToReachViewModel;
