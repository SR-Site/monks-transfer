import DefaultComponentController from "../DefaultComponentController";
import BlockMapTransitionController from 'app/component/block/block-map/BlockMapTransitionController';
import IBlockMapOptions from 'app/component/block/block-map/IBlockMapOptions';
import BlockMapViewModel from 'app/component/block/block-map/BlockMapViewModel';

import Log from "lib/temple/util/Log";

class BlockMapController extends DefaultComponentController<BlockMapViewModel, IBlockMapOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockMap');

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
		this.transitionController = new BlockMapTransitionController(this.element, this);

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

export default BlockMapController;
