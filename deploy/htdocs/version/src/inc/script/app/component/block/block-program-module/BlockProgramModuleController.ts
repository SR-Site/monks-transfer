import DefaultComponentController from "../DefaultComponentController";
import BlockProgramModuleTransitionController from 'app/component/block/block-program-module/BlockProgramModuleTransitionController';
import IBlockProgramModuleOptions from 'app/component/block/block-program-module/IBlockProgramModuleOptions';
import BlockProgramModuleViewModel from 'app/component/block/block-program-module/BlockProgramModuleViewModel';

import Log from "lib/temple/util/Log";

class BlockProgramModuleController extends DefaultComponentController<BlockProgramModuleViewModel, IBlockProgramModuleOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockProgramModule');

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
		this.transitionController = new BlockProgramModuleTransitionController(this.element, this);

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

export default BlockProgramModuleController;
