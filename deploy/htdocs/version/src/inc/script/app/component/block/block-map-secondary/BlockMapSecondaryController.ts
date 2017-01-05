import DefaultComponentController from "../DefaultComponentController";
import BlockMapSecondaryTransitionController from 'app/component/block/block-map-secondary/BlockMapSecondaryTransitionController';
import IBlockMapSecondaryOptions from 'app/component/block/block-map-secondary/IBlockMapSecondaryOptions';
import BlockMapSecondaryViewModel from 'app/component/block/block-map-secondary/BlockMapSecondaryViewModel';

import Log from "lib/temple/util/Log";

class BlockMapSecondaryController extends DefaultComponentController<BlockMapSecondaryViewModel, IBlockMapSecondaryOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockMapSecondary');

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
		this.transitionController = new BlockMapSecondaryTransitionController(this.element, this);

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

export default BlockMapSecondaryController;
