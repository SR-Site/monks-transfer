import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockBlogPostTransitionController from 'app/component/block/block-blog-post/BlockBlogPostTransitionController';
import IBlockBlogPostOptions from 'app/component/block/block-blog-post/IBlockBlogPostOptions';
import BlockBlogPostViewModel from 'app/component/block/block-blog-post/BlockBlogPostViewModel';

import Log from "lib/temple/util/Log";

class BlockBlogPostController extends AbstractBlockComponentController<BlockBlogPostViewModel, IBlockBlogPostOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockBlogPost');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockBlogPostTransitionController(this.element, this);

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

export default BlockBlogPostController;
