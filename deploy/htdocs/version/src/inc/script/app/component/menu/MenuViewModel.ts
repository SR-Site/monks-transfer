import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import MenuController from 'app/component/menu/MenuController';
import IMenuOptions from 'app/component/menu/IMenuOptions';

import ko = require('knockout');

class MenuViewModel extends DefaultComponentTransitionViewModel<MenuController, IMenuOptions>
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

export default MenuViewModel;
