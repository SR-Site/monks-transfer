import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockImageCallToActionsTransitionController from 'app/component/block/block-image-call-to-actions/BlockImageCallToActionsTransitionController';
import IBlockImageCallToActionsOptions from 'app/component/block/block-image-call-to-actions/IBlockImageCallToActionsOptions';


import Log from "lib/temple/util/Log";
import NativeEventListener from "../../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../../lib/temple/util/ThrottleDebounce";
import BlockImageCallToActionsViewModel from "./BlockImageCallToActionsViewModel";

class BlockImageCallToActionsController extends AbstractBlockComponentController<BlockImageCallToActionsViewModel, IBlockImageCallToActionsOptions>
{
	private static HOVER_SCALE: number = 1.1;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockImageCallToActions');

	private _callToActionsImages: Array<HTMLElement>;

	private _hoverSizes: Array<Array<number>> = [];

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

		this.calculateSizes();
		this.handleResize();
	}

	/**
	 * @public
	 * @method get triangleSize
	 * @returns {any|any<number>}
	 */
	public get triangleSize(): number
	{
		return this.viewModel.triangleSize();
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
	 * @public
	 * @method clipImages
	 */
	public clipImages(duration: number = 0): void
	{
		let elementHeight: number = this.element.offsetHeight;
		let left: number = 0;

		// Default size
		let elementWidth: number = this.element.offsetWidth / this.options.callToActions.length;

		this._callToActionsImages.forEach((element: HTMLElement, index: number) =>
		{
			if(this.viewModel.activeImageIndex() !== null)
			{
				elementWidth = this.element.offsetWidth * this._hoverSizes[this.viewModel.activeImageIndex()][index];
			}

			let right: number = left + elementWidth;

			TweenLite.to(element, duration, {
				clip: 'rect(0px, ' + right + 'px, ' + elementHeight + 'px, ' + left + 'px)',
				ease: Expo.easeOut
			});

			left += elementWidth;
		})
	}

	/**
	 * @private
	 * @method calculateSizes
	 */
	private calculateSizes(): void
	{
		// Base size
		let size = 1 / this.options.callToActions.length;

		let growSize = size * BlockImageCallToActionsController.HOVER_SCALE;
		let otherSize = (1 - growSize) / (this.options.callToActions.length - 1);

		// Dynamically calculate the sizes based on the amount of options
		this.options.callToActions.forEach((callToAction, rowIndex: number) =>
		{
			this._hoverSizes[rowIndex] = [];

			this.options.callToActions.forEach((callToAction, index: number) =>
			{
				this._hoverSizes[rowIndex].push(index === rowIndex ? growSize : otherSize);
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

		this.viewModel.triangleSize((1 / this.options.callToActions.length) * document.body.offsetWidth);
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._callToActionsImages = null;

		// always call this last
		super.destruct();
	}
}

export default BlockImageCallToActionsController;
