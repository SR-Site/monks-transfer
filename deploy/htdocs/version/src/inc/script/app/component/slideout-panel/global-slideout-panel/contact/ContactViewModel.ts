import DefaultComponentTransitionViewModel from "../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ContactController from './ContactController';
import IContactOptions from './IContactOptions';

import ko = require('knockout');
import KnockoutValidator from "../../../../../lib/temple/util/knockoutvalidator/KnockoutValidator";

class ContactViewModel extends DefaultComponentTransitionViewModel<ContactController, IContactOptions>
{
	public myValidator: KnockoutValidator = new KnockoutValidator();


	/**
	 * @public
	 * @method onSubmit
	 */
	public onSubmit(): void
	{
		this.controller.onSubmit();
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		if(this.myValidator)
		{
			this.myValidator.destruct();
			this.myValidator = null;
		}

		// always call this last
		super.destruct();
	}
}

export default ContactViewModel;
