import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockBlogPostController from 'app/component/block/block-blog-post/BlockBlogPostController';
import IBlockBlogPostOptions from 'app/component/block/block-blog-post/IBlockBlogPostOptions';

import ko = require('knockout');

class BlockBlogPostViewModel extends AbstractBlockComponentViewModel<BlockBlogPostController, IBlockBlogPostOptions>
{
	public viewCount:KnockoutObservable<number> = ko.observable(0);

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.viewCount = null

		// always call this last
		super.destruct();
	}
}

export default BlockBlogPostViewModel;
