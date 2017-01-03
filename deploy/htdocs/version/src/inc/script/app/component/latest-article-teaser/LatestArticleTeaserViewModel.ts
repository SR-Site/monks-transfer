import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import LatestArticleTeaserController from 'app/component/latest-article-teaser/LatestArticleTeaserController';
import ILatestArticleTeaserOptions from 'app/component/latest-article-teaser/ILatestArticleTeaserOptions';

import ko = require('knockout');

class LatestArticleTeaserViewModel extends DefaultComponentTransitionViewModel<LatestArticleTeaserController, ILatestArticleTeaserOptions>
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

export default LatestArticleTeaserViewModel;
