import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockVideoWithContentTransitionController from 'app/component/block/block-video-with-content/BlockVideoWithContentTransitionController';
import IBlockVideoWithContentOptions from 'app/component/block/block-video-with-content/IBlockVideoWithContentOptions';
import BlockVideoWithContentViewModel from 'app/component/block/block-video-with-content/BlockVideoWithContentViewModel';

import Log from "lib/temple/util/Log";
import Alignment from 'app/data/enum/layout/Alignment';

class BlockVideoWithContentController extends AbstractBlockComponentController<BlockVideoWithContentViewModel, IBlockVideoWithContentOptions, BlockVideoWithContentTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockVideoWithContent');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		// Add the extra classes to the component
		if(this.options.alignment === Alignment.LEFT) this.viewModel.elementClassNames.push('left-aligned');
		if(this.options.alignment === Alignment.RIGHT) this.viewModel.elementClassNames.push('right-aligned');

		this._debug.log('Init');

		super.init();
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockVideoWithContentTransitionController(this.element, this);

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

export default BlockVideoWithContentController;
