import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonPlayCircleController from 'app/component/button/button-play-circle/ButtonPlayCircleController';
import IButtonPlayCircleOptions from 'app/component/button/button-play-circle/IButtonPlayCircleOptions';

import ko = require('knockout');

class ButtonPlayCircleViewModel extends DefaultButtonViewModel<ButtonPlayCircleController, IButtonPlayCircleOptions>
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

export default ButtonPlayCircleViewModel;
