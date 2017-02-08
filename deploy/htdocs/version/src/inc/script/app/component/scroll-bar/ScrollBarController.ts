import AbstractComponentController from "lib/temple/component/AbstractComponentController";
import IScrollBarOptions from "app/component/scroll-bar/IScrollBarOptions";
import ScrollBarViewModel from "app/component/scroll-bar/ScrollBarViewModel";
import Log from "lib/temple/util/Log";
import DraggableInstance from "../../util/DraggableInstance";
import CommonEvent from "../../../lib/temple/event/CommonEvent";

class ScrollBarController extends AbstractComponentController<ScrollBarViewModel, IScrollBarOptions>
{
	private _draggableInstance: DraggableInstance;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.ScrollBar');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		this._debug.log('Init');

		// Create the draggable instance
		this._draggableInstance = new DraggableInstance(this.element, {
			maxDuration: 0.5
		});

		// Bubble up the event
		this._draggableInstance.addEventListener(CommonEvent.UPDATE, (event) => this.dispatchEvent(event));
	}

	/**
	 * @public
	 * @method setSnapPosition
	 * @param xPos
	 */
	public setSnapPosition(xPos: number): void
	{
		this._draggableInstance.setSnapPosition(xPos);
	}


	/**
	 * @public
	 * @method set enabled
	 */
	public set enabled(enabled: boolean)
	{
		this._draggableInstance.enabled = enabled;
	}

	/**
	 * @public
	 * @method set progress
	 * @param progress
	 */
	public set progress(progress: number)
	{
		this._draggableInstance.progress = progress;
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

		// always call this last
		super.destruct();
	}
}

export default ScrollBarController;
