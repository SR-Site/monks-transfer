import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockBlogPostController from 'app/component/block/block-blog-post/BlockBlogPostController';
import IBlockBlogPostOptions from 'app/component/block/block-blog-post/IBlockBlogPostOptions';

import ko = require('knockout');

class BlockBlogPostViewModel extends AbstractBlockComponentViewModel<BlockBlogPostController, IBlockBlogPostOptions>
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

export default BlockBlogPostViewModel;
