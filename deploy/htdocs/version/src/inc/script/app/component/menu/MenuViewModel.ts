import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import MenuController from 'app/component/menu/MenuController';
import IMenuOptions from 'app/component/menu/IMenuOptions';

import ko = require('knockout');
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import DataManager from "../../data/DataManager";
import MenuEvent from "../../event/MenuEvent";
import Routes from "../../config/Routes";

class MenuViewModel extends DefaultComponentTransitionViewModel<MenuController, IMenuOptions>
{
	public PanelBlocks: Class = PanelBlocks;
	public Routes: Class = Routes;

	/**
	 * @public
	 * @method handleClickContact
	 */
	public handleClickContact(): void
	{
		// Close the menu panel
		this.controller.dispatch(MenuEvent.CLOSE)

		// Open the contact panel
		DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.PanelBlocks = null;
		this.Routes = null;

		// always call this last
		super.destruct();
	}
}

export default MenuViewModel;
