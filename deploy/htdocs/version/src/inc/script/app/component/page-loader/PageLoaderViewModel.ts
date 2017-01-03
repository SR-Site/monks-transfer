import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import PageLoaderController from 'app/component/page-loader/PageLoaderController';
import IPageLoaderOptions from 'app/component/page-loader/IPageLoaderOptions';

import ko = require('knockout');

class PageLoaderViewModel extends DefaultComponentTransitionViewModel<PageLoaderController, IPageLoaderOptions>
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

export default PageLoaderViewModel;
