import DefaultComponentController from "../DefaultComponentController";
import BlockArticleTeaserTransitionController from 'app/component/block/block-article-teaser/BlockArticleTeaserTransitionController';
import IBlockArticleTeaserOptions from 'app/component/block/block-article-teaser/IBlockArticleTeaserOptions';
import BlockArticleTeaserViewModel from 'app/component/block/block-article-teaser/BlockArticleTeaserViewModel';

import Log from "lib/temple/util/Log";

class BlockArticleTeaserController extends DefaultComponentController<BlockArticleTeaserViewModel, IBlockArticleTeaserOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockArticleTeaser');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		console.log('init article teaser , callbackcounter');

		this._debug.log('Init');
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockArticleTeaserTransitionController(this.element, this);
		console.log('allComponentsLoaded articleTeaser');

		super.allComponentsLoaded();
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

export default BlockArticleTeaserController;
