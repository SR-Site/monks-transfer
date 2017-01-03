import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonCallToReachController from 'app/component/button/button-call-to-reach/ButtonCallToReachController';
import IButtonCallToReachOptions from 'app/component/button/button-call-to-reach/IButtonCallToReachOptions';

import ko = require('knockout');

class ButtonCallToReachViewModel extends DefaultButtonViewModel<ButtonCallToReachController, IButtonCallToReachOptions>
{
	/**
	 * @public
	 * @method get icon
	 * @returns {string}
	 */
	public get icon(): string
	{
		return this.data.icon
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default ButtonCallToReachViewModel;
