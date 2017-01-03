import DefaultComponentController from "../DefaultComponentController";
import BlockImageCallToActionsTransitionController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsTransitionController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';
import BlockImageCallToActionsViewModel from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsViewModel';

import Log from "lib/temple/util/Log";
import NativeEventListener from "../../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../../lib/temple/util/ThrottleDebounce";

class BlockImageCallToActionsController extends DefaultComponentController<BlockImageCallToActionsViewModel, IBlockImageCallToActionsOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockImageCallToActions');

	private _callToActionsImages: Array<HTMLElement>;
	private _activeIndex: number;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this._callToActionsImages = Array.prototype.slice.call(this.element.querySelectorAll('.call-to-action-image'));

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 100, this)));

		this.clipImages()
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockImageCallToActionsTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method clipImages
	 */
	private clipImages(): void
	{
		let elementWidth: number = this.element.offsetWidth / this.options.callToActions.length;
		let elementHeight: number = this.element.offsetHeight;

		this._callToActionsImages.forEach((element: HTMLElement, index: number) =>
		{
			let right: number = this.element.offsetWidth - (((this.options.callToActions.length - 1) - index) * elementWidth);
			let left: number = index * elementWidth;

			TweenLite.set(element, {
				clip: 'rect(0px, ' + right + 'px, ' + elementHeight + 'px, ' + left + 'px)'
			})
		})
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		this.clipImages();
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

export default BlockImageCallToActionsController;
