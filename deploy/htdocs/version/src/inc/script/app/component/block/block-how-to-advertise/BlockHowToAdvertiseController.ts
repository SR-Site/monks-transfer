import DefaultComponentController from "../DefaultComponentController";
import BlockHowToAdvertiseTransitionController from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseTransitionController';
import IBlockHowToAdvertiseOptions from 'app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions';
import BlockHowToAdvertiseViewModel from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseViewModel';

import Log from "lib/temple/util/Log";
import DraggableInstance from "../../../util/DraggableInstance";

class BlockHowToAdvertiseController extends DefaultComponentController<BlockHowToAdvertiseViewModel, IBlockHowToAdvertiseOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockHowToAdvertise');

	private _draggableInstance:DraggableInstance;

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this._draggableInstance = new DraggableInstance(<HTMLElement>this.element.querySelector('.js-draggable-container'), {
			invert: true,
			enableTrackPad: true
		});
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockHowToAdvertiseTransitionController(this.element, this);

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

export default BlockHowToAdvertiseController;
