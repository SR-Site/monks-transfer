import DefaultComponentController from "../DefaultComponentController";
import BlockFilterContentTransitionController from 'app/component/block/block-filter-content/BlockFilterContentTransitionController';
import IBlockFilterContentOptions from 'app/component/block/block-filter-content/IBlockFilterContentOptions';
import BlockFilterContentViewModel from 'app/component/block/block-filter-content/BlockFilterContentViewModel';

import Log from "lib/temple/util/Log";

class BlockFilterContentController extends DefaultComponentController<BlockFilterContentViewModel, IBlockFilterContentOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockFilterContent');

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
		this.transitionController = new BlockFilterContentTransitionController(this.element, this);

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

export default BlockFilterContentController;
