import DefaultComponentController from "../DefaultComponentController";
import BlockDummyComponentTransitionController from 'app/component/block/block-dummy-component/BlockDummyComponentTransitionController';
import IBlockDummyComponentOptions from 'app/component/block/block-dummy-component/IBlockDummyComponentOptions';
import BlockDummyComponentViewModel from 'app/component/block/block-dummy-component/BlockDummyComponentViewModel';

import Log from "lib/temple/util/Log";

class BlockDummyComponentController extends DefaultComponentController<BlockDummyComponentViewModel, IBlockDummyComponentOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockDummyComponent');

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
		this.transitionController = new BlockDummyComponentTransitionController(this.element, this);

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

export default BlockDummyComponentController;
