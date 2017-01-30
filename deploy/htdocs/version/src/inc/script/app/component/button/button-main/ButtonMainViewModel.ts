import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonMainController from 'app/component/button/button-main/ButtonMainController';
import IButtonMainOptions from 'app/component/button/button-main/IButtonMainOptions';

import ko = require('knockout');

class ButtonMainViewModel extends DefaultButtonViewModel<ButtonMainController, IButtonMainOptions>
{
	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseEnter():void
	{
		this.controller.transitionController.onMouseEnter();
	}
	
	/**
	 * @public
	 * @method handleMouseLeave
	 */
	public handleMouseLeave():void
	{
		this.controller.transitionController.onMouseLeave();
	}

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
