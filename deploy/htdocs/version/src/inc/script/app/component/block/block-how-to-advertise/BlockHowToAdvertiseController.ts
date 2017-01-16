import DefaultComponentController from "../DefaultComponentController";
import BlockHowToAdvertiseTransitionController from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseTransitionController';
import IBlockHowToAdvertiseOptions from 'app/component/block/block-how-to-advertise/IBlockHowToAdvertiseOptions';
import BlockHowToAdvertiseViewModel from 'app/component/block/block-how-to-advertise/BlockHowToAdvertiseViewModel';

import Log from "lib/temple/util/Log";
import DraggableInstance from "../../../util/DraggableInstance";
import ScrollBarController from "../../scroll-bar/ScrollBarController";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import {IDraggableEventData} from "../../../util/DraggableInstance";
import DataEvent from "../../../../lib/temple/event/DataEvent";

class BlockHowToAdvertiseController extends DefaultComponentController<BlockHowToAdvertiseViewModel, IBlockHowToAdvertiseOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHowToAdvertise');

	private _draggableInstance: DraggableInstance;
	private _scrollBarController: ScrollBarController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this._draggableInstance = new DraggableInstance(<HTMLElement>this.element.querySelector('.js-draggable-container'), {
			invert: true,
			enableTrackPad: true
		});

		this._draggableInstance.addEventListener(CommonEvent.UPDATE, this.handleDraggableInstanceUpdate.bind(this));
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHowToAdvertiseTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @public
	 * @method handleScrollBarReady
	 */
	public handleScrollBarReady(controller: ScrollBarController): void
	{
		this._scrollBarController = controller;
		this._scrollBarController.addEventListener(CommonEvent.UPDATE, this.handleScrollBarUpdate.bind(this));
	}

	/**
	 * @private
	 * @method handleScrollBarUpdate
	 * @param event
	 */
	private handleScrollBarUpdate(event: DataEvent<IDraggableEventData>): void
	{
		if(this._draggableInstance)
		{
			this._draggableInstance.progress = event.data.progress;
		}
	}

	/**
	 * @private
	 * @method handleDraggableInstanceUpdate
	 * @param event
	 */
	private handleDraggableInstanceUpdate(event: DataEvent<IDraggableEventData>): void
	{
		if(this._scrollBarController)
		{
			this._scrollBarController.progress = event.data.progress;
		}
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockHowToAdvertiseController;
