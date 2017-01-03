import DefaultComponentController from "../DefaultComponentController";
import BlockPersonaSelectorTransitionController from 'app/component/block/block-persona-selector/BlockPersonaSelectorTransitionController';
import IBlockPersonaSelectorOptions from 'app/component/block/block-persona-selector/IBlockPersonaSelectorOptions';
import BlockPersonaSelectorViewModel from 'app/component/block/block-persona-selector/BlockPersonaSelectorViewModel';

import Log from "lib/temple/util/Log";

class BlockPersonaSelectorController extends DefaultComponentController<BlockPersonaSelectorViewModel, IBlockPersonaSelectorOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockPersonaSelector');

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
		this.transitionController = new BlockPersonaSelectorTransitionController(this.element, this);

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

export default BlockPersonaSelectorController;
