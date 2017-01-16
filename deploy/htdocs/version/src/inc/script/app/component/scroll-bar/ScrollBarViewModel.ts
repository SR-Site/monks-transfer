import AbstractComponentViewModel from 'lib/temple/component/AbstractComponentViewModel';
import ScrollBarController from 'app/component/scroll-bar/ScrollBarController';
import IScrollBarOptions from 'app/component/scroll-bar/IScrollBarOptions';

import ko = require('knockout');

class ScrollBarViewModel extends AbstractComponentViewModel<ScrollBarController, IScrollBarOptions>
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

export default ScrollBarViewModel;