import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockStoryInfoImagesTransitionController from 'app/component/block/block-story-info-images/BlockStoryInfoImagesTransitionController';
import IBlockStoryInfoImagesOptions from 'app/component/block/block-story-info-images/IBlockStoryInfoImagesOptions';
import BlockStoryInfoImagesViewModel from 'app/component/block/block-story-info-images/BlockStoryInfoImagesViewModel';

import Log from "lib/temple/util/Log";

class BlockStoryInfoImagesController extends AbstractBlockComponentController<BlockStoryInfoImagesViewModel, IBlockStoryInfoImagesOptions, BlockStoryInfoImagesTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockStoryInfoImages');

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
		this.transitionController = new BlockStoryInfoImagesTransitionController(this.element, this);

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

export default BlockStoryInfoImagesController;
