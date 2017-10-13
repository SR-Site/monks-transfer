import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import HeaderController from "app/component/header/HeaderController";
import IHeaderOptions from "app/component/header/IHeaderOptions";
import DataManager from "../../data/DataManager";

import ko = require('knockout');
import ThemeHelper from "../../util/ThemeHelper";
import LinkType from 'app/data/enum/type/LinkType';

class HeaderViewModel extends DefaultComponentTransitionViewModel<HeaderController, IHeaderOptions>
{
	public menuButtonDisabled: KnockoutObservable<boolean> = ko.observable(false);
	public menuButtonActive: KnockoutObservable<boolean> = ko.observable(false);
	public callButtonDisabled: KnockoutObservable<boolean> = ko.observable(false);
	public enableSolidBackground: KnockoutObservable<boolean> = ko.observable(false);
	public classNames: KnockoutComputed<string>;
	public LinkType:any = LinkType;

	constructor()
	{
		super();

		this.classNames = ko.computed(() =>
		{
			let classes = [];

			classes.push(ThemeHelper.getTheme(DataManager.getInstance().headerTheme()));

			if(this.enableSolidBackground())
			{
				classes.push('enable-solid-background')
			}

			return classes.join(' ');
		})
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
	 * @public
	 * @method handleMenuButtonClick
	 */
	public handleMenuButtonClick(): void
	{
		if(this.menuButtonActive())
		{
			this.controller.closeMenu();
		}
		else
		{
			this.controller.openMenu();
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.menuButtonDisabled = null;
		this.callButtonDisabled = null;
		this.enableSolidBackground = null;

		// always call this last
		super.destruct();
	}
}

export default HeaderViewModel;
