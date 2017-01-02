import DefaultComponentController from "../DefaultComponentController";
import BlockImageCallToActionsTransitionController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsTransitionController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';
import BlockImageCallToActionsViewModel from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsViewModel';

import Log from "lib/temple/util/Log";

class BlockImageCallToActionsController extends DefaultComponentController<BlockImageCallToActionsViewModel, IBlockImageCallToActionsOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockImageCallToActions');

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
		this.transitionController = new BlockImageCallToActionsTransitionController(this.element, this);

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

export default BlockImageCallToActionsController;
