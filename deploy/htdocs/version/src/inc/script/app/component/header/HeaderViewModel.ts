import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import HeaderController from 'app/component/header/HeaderController';
import IHeaderOptions from 'app/component/header/IHeaderOptions';

import ko = require('knockout');

class HeaderViewModel extends DefaultComponentTransitionViewModel<HeaderController, IHeaderOptions>
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

export default HeaderViewModel;
