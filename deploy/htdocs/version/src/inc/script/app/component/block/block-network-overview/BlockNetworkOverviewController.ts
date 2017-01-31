import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockNetworkOverviewTransitionController from 'app/component/block/block-network-overview/BlockNetworkOverviewTransitionController';
import IBlockNetworkOverviewOptions from 'app/component/block/block-network-overview/IBlockNetworkOverviewOptions';
import BlockNetworkOverviewViewModel from 'app/component/block/block-network-overview/BlockNetworkOverviewViewModel';

import Log from "lib/temple/util/Log";
import DraggableInstance from "../../../util/DraggableInstance";
import ScrollBarController from "../../scroll-bar/ScrollBarController";
import CommonEvent from "../../../../lib/temple/event/CommonEvent";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import {IDraggableEventData} from "../../../util/DraggableInstance";

class BlockNetworkOverviewController extends AbstractBlockComponentController<BlockNetworkOverviewViewModel, IBlockNetworkOverviewOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockNetworkOverview');

	private _draggableInstance: DraggableInstance;
	private _scrollBarController: ScrollBarController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._draggableInstance = new DraggableInstance(<HTMLElement>this.element.querySelector('.js-draggable-container'), {
			invert: true,
			enableTrackPad: true
		});

		this._draggableInstance.addEventListener(CommonEvent.UPDATE, this.handleDraggableInstanceUpdate.bind(this));

		this._debug.log('Init');
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockNetworkOverviewTransitionController(this.element, this);

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
		if(this._draggableInstance)
		{
			this._draggableInstance.destruct();
			this._draggableInstance = null;
		}

		this._scrollBarController = null;

		// always call this last
		super.destruct();
	}
}

export default BlockNetworkOverviewController;
