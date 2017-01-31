import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import FooterController from 'app/component/footer/FooterController';
import IFooterOptions from 'app/component/footer/IFooterOptions';

import ko = require('knockout');

class FooterViewModel extends DefaultComponentTransitionViewModel<FooterController, IFooterOptions>
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

export default FooterViewModel;
