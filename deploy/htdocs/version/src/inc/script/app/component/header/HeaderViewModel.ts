import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import HeaderController from 'app/component/header/HeaderController';
import IHeaderOptions from 'app/component/header/IHeaderOptions';

import ko = require('knockout');
import MenuEvent from "../../event/MenuEvent";

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
		// Notify about the menu opening/closing
		this.controller.dispatch(this.menuButtonActive() ? MenuEvent.CLOSE : MenuEvent.OPEN);

		// Update the UI
		this.menuButtonActive(!this.menuButtonActive())
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
