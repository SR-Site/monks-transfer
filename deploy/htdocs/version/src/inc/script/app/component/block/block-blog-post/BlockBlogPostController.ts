import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockBlogPostTransitionController from 'app/component/block/block-blog-post/BlockBlogPostTransitionController';
import IBlockBlogPostOptions from 'app/component/block/block-blog-post/IBlockBlogPostOptions';
import BlockBlogPostViewModel from 'app/component/block/block-blog-post/BlockBlogPostViewModel';

import Log from "lib/temple/util/Log";
import DataManager from "../../../data/DataManager";
import * as Gaia from "lib/gaia/api/Gaia";
import Params from "../../../data/enum/gaia/Params";
import IGatewayResult from "../../../net/gateway/result/IGatewayResult";
import IViewCountData from "../../../data/interface/IViewCountData";

class BlockBlogPostController extends AbstractBlockComponentController<BlockBlogPostViewModel, IBlockBlogPostOptions, BlockBlogPostTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockBlogPost');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.viewModel.viewCount(this.options.views);

		// Track the page view
		DataManager.getInstance().serviceModel.contentService.viewCount(Gaia.api.getParam(Params.DEEPLINK))
			.then((result: IGatewayResult<IViewCountData>) =>
			{
				this.viewModel.viewCount(parseInt(result.data.totalcount, 10));
			}).catch((result) => console.error(result))
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockBlogPostTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockBlogPostController;
