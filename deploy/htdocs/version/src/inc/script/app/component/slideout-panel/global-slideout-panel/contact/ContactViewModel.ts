import DefaultComponentTransitionViewModel from "../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ContactController from "./ContactController";
import IContactOptions from "./IContactOptions";
import KnockoutValidator from "../../../../../lib/temple/util/knockoutvalidator/KnockoutValidator";
import ValidationRules from "../../../../../lib/temple/util/knockoutvalidator/ValidationRules";

import ko = require('knockout');
import DataManager from 'app/data/DataManager';

class ContactViewModel extends DefaultComponentTransitionViewModel<ContactController, IContactOptions>
{
	public myValidator: KnockoutValidator = new KnockoutValidator();

	public fields: Array<{name: string; localeKey: string, observable: KnockoutObservable<string>, validationRules: Array<RegExp>|RegExp}> = [
		{
			name: 'firstName',
			localeKey: 'firstName',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'lastName',
			localeKey: 'lastName',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'company',
			localeKey: 'company',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'city',
			localeKey: 'city',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'state',
			localeKey: 'state',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'email',
			localeKey: 'email',
			validationRules: [ValidationRules.nonEmpty, ValidationRules.emailRegex],
			observable: ko.observable('')
		},
		{
			name: 'phone',
			localeKey: 'phone_number',
			validationRules: [ValidationRules.nonEmpty, ValidationRules.isValidPhone],
			observable: ko.observable('')
		},
		{
			name: 'zipCode',
			localeKey: 'zipcode',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		},
		{
			name: 'comments',
			localeKey: 'comments',
			validationRules: ValidationRules.nonEmpty,
			observable: ko.observable('')
		}
	];

	/**
	 * @public
	 * @method onSubmit
	 */
	public onSubmit(): void
	{
		this.controller.onSubmit();
	}

	/**
	 * @public
	 * @method handleCallClick
	 */
	public handleCallClick(): void
	{
		window.open('tel:' + DataManager.getInstance().settingsModel.initDataModel.contactOptions.phone.phoneNumber);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		if(this.myValidator)
		{
			this.myValidator.destruct();
			this.myValidator = null;
		}

		this.fields = null;

		// always call this last
		super.destruct();
	}
}

export default ContactViewModel;
