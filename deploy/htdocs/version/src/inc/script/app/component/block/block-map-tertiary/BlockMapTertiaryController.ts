import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockMapTertiaryTransitionController from 'app/component/block/block-map-tertiary/BlockMapTertiaryTransitionController';
import IBlockMapTertiaryOptions from 'app/component/block/block-map-tertiary/IBlockMapTertiaryOptions';
import BlockMapTertiaryViewModel from 'app/component/block/block-map-tertiary/BlockMapTertiaryViewModel';

import Log from "lib/temple/util/Log";

class BlockMapTertiaryController extends AbstractBlockComponentController<BlockMapTertiaryViewModel, IBlockMapTertiaryOptions, BlockMapTertiaryTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockMapTertiary');

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
		this.transitionController = new BlockMapTertiaryTransitionController(this.element, this);

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

export default BlockMapTertiaryController;
