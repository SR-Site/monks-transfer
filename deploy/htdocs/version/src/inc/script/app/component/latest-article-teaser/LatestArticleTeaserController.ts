import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import LatestArticleTeaserTransitionController from 'app/component/latest-article-teaser/LatestArticleTeaserTransitionController';
import ILatestArticleTeaserOptions from 'app/component/latest-article-teaser/ILatestArticleTeaserOptions';
import LatestArticleTeaserViewModel from 'app/component/latest-article-teaser/LatestArticleTeaserViewModel';

import Log from "lib/temple/util/Log";

class LatestArticleTeaserController extends DefaultComponentTransitionController<LatestArticleTeaserViewModel, ILatestArticleTeaserOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.LatestArticleTeaser');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new LatestArticleTeaserTransitionController(this.element, this);

	}


	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default LatestArticleTeaserController;
