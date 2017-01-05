import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import HeaderController from "app/component/header/HeaderController";
import IHeaderOptions from "app/component/header/IHeaderOptions";
import MenuEvent from "../../event/MenuEvent";

import ko = require('knockout');

class HeaderViewModel extends DefaultComponentTransitionViewModel<HeaderController, IHeaderOptions>
{
	public menuButtonDisabled: KnockoutObservable<boolean> = ko.observable(false);
	public menuButtonActive: KnockoutObservable<boolean> = ko.observable(false);
	public callButtonDisabled: KnockoutObservable<boolean> = ko.observable(false);
	public enableSolidBackground: KnockoutObservable<boolean> = ko.observable(false);

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
