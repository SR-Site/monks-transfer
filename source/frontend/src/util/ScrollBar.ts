import { TweenLite } from 'gsap';
import Draggable from 'gsap/Draggable';
import { debounce } from 'lodash';

interface ScrollbarOptions {
	inside: boolean;
	hidebar: boolean;
	hideBarTime: number;
	horizontal: boolean;
	setContentSize: boolean;
}

/**
 * ## Scrollbar
 * Class that creates a custom scroll bar.
 *
 * ### Features:
 * - Create scroll bar inside or outside of scrolling content
 * - Hide scroll bar after x amount of milliseconds
 * - Horizontal scroll bar
 * - Vertical scroll bar
 *
 * # Getting started
 * The easiest way to use this custom scroll bar is to use knockout.scrollbar.
 * This lets you create the custom scroll bar using knockout
 *
 * If you don't want to use knockout than create a html structure like this:
 *
 * ```html
 * <div class="scroll-wrapper">
 *     <div class="scroll-content" data-scroll-content>
 *
 *          <div data-content-inner>
 *              Scrollable Content Here
 *          </div>
 *
 *     </div>
 *     <div class="scroll-bar" data-scroll-bar>
 *         <span class="knob" data-scroll-knob></span>
 *     </div>
 * </div>
 * ```
 *
 * Create  a new Scrollbar instance.
 * Default options are set, if you don't need to change them than leave them out
 *
 * ```typescript
 * private _scrollbar:Scrollbar;
 *
 * var element = <HTMLElement>document.querySelector('.scroll-wrapper');
 * var options = {
 *		inside: false,
 *		hidebar: false,
 *		hideBarTime: 800,
 *		horizontal: false,
 *		setContentSize: true
 * };
 *
 * this_scrollbar = new Scrollbar(element, options);
 * ```
 *
 * ### Styling
 * The styling for the scroll bar can be found in 'style/asset/_scrollbar.scss'
 * This file needs to be imported in the _asset.scss file
 *
 * @class Scrollbar
 * @namespace temple.component
 * @extend temple.events.EventDispatcher
 */

class Scrollbar {
	private _options: ScrollbarOptions = {
		inside: false,
		hidebar: false,
		hideBarTime: 800,
		horizontal: false,
		setContentSize: true,
	};

	private _isDestructed: boolean = false;

	private _content: HTMLElement;
	private _contentInner: HTMLElement;
	private _bar: HTMLElement;
	private _knob: HTMLElement;

	private _dragInstance: Draggable;
	private _hideTimer: number;
	private _isDragging: boolean = false;

	private _overflowSize: number = 0;

	private _barSize: number = 0;
	private _barSizeOpposite: number = 0;
	private _knobSize: number = 0;

	private _resizeEvent: () => void;
	private _scrollEvent: () => void;

	/**
	 * @constructor
	 * @param {HTMLElement} element
	 * @param {ScrollbarOptions} options
	 */
	constructor(public element: HTMLElement, options?: ScrollbarOptions) {
		Object.assign(this._options, options);

		this._content = <HTMLElement>this.element.querySelector('[data-scroll-content]');
		this._contentInner = <HTMLElement>this._content.querySelector('[data-content-inner]');
		this._bar = <HTMLElement>this.element.querySelector('[data-scroll-bar]');
		this._knob = <HTMLElement>this._bar.querySelector('[data-scroll-knob]');

		if (this._options.horizontal) {
			this.element.classList.add('scroll-x');
		}

		this._resizeEvent = debounce(this.handleWindowResize, 150, this);
		this._scrollEvent = this.handleContentScroll;

		this.addEvents();
		this.createDraggable();
		this.hideKnob(true);

		this.update();
		this.setContentSize();
	}

	private handleWindowResize = (): void => {
		if (!this._isDestructed) {
			this.update();
			this.setContentSize();
			this.onScroll();
		}
	};

	private handleContentScroll = (): void => {
		this.showKnob();
		this.onScroll();
	};

	/**
	 * Add event listeners
	 * resize: on resize of window update the sizes and scroll position
	 * scroll: show the knob and handle the scroll
	 * mouseenter: show the knob on mouse enter on the bar
	 * mouseleave: hide knob on mouse leave of the bar when not dragging
	 *
	 * @method addEvents
	 */
	private addEvents(): void {
		window.addEventListener('resize', this._resizeEvent);
		this._content.addEventListener('scroll', this._scrollEvent);

		this._bar.addEventListener('mouseenter', this.showKnob.bind(this));
		this._bar.addEventListener('mouseleave', () => {
			if (!this._isDragging) {
				this.startHideKnob();
			}
		});
	}

	/**
	 * Create draggable element of the knob to enable drag to scroll
	 *
	 * @method createDraggable
	 */
	private createDraggable(): void {
		this._dragInstance = Draggable.create(this._knob, {
			bounds: this._bar,
			type: this._options.horizontal ? 'x' : 'y',
			zindexBoost: false,
			cursor: 'default',
			onDragStart: () => {
				this._isDragging = true;
				this._knob.classList.add('dragging');
			},
			onDragEnd: () => {
				this._isDragging = false;
				this._knob.classList.remove('dragging');
			},
			onDrag: () => {
				this.handleDrag();
			},
		})[0];
	}

	/**
	 * Update all sizes of the scroll bar
	 *
	 * @method update
	 */
	public update(): void {
		this._overflowSize = this.getScrollSize() - this.getWrapperSize();
		this.resizeKnob();
		this.getBarSize();
		this.getBarSizeOpposite();
		this.getKnobSize();
		this._dragInstance.update(true);
		this.onScroll();
	}

	/**
	 * Handle the dragging of the knob
	 * Calculates the new scroll position to the position of the knob and set the scroll position of the scroll area
	 *
	 * @method handleDrag
	 */
	private handleDrag(): void {
		const max = this._barSize - this._knobSize;
		const pos = this._knob['_gsTransform'][this._options.horizontal ? 'x' : 'y'];
		const percentage = pos / max;

		this.scrollTo(Math.round(this._overflowSize * percentage));
	}

	/**
	 * Handle the on scroll event
	 * If the knob is not dragging than update the position of the knob on scroll
	 * On scroll reset the start hide knob
	 *
	 * @method onScroll
	 */
	public onScroll(): void {
		if (!this._isDragging) {
			const scrollPos: number = this._content[this._options.horizontal ? 'scrollLeft' : 'scrollTop'];
			const percentage: number = (scrollPos / this._overflowSize);
			const max: number = this._barSize - this._knobSize;

			const dimensions = {};
			const dimension = max * percentage;
			dimensions[this._options.horizontal ? 'x' : 'y'] = (isNaN(dimension)) ? 0 : Math.round(dimension);

			TweenLite.set(this._knob, dimensions);
		}

		this.startHideKnob();
	}

	/**
	 * Set the width or height of the content-inner element
	 * Setting with or height is depending on the type of scroll(vertical/horizontal)
	 * If hidebar is false and inside is false the scroll bar will appear outside of the content inner,
	 * else the scrollbar will appear on top of the content inner
	 *
	 * @method setContentSize
	 */
	public setContentSize(): void {
		if (!this._options.setContentSize) { return; }

		const size: string = (
			this.getWrapperSizeOpposite() - (!this._options.hidebar && !this._options.inside
				? this._barSizeOpposite : 0)
		) + 'px';

		this._contentInner.style[(this._options.horizontal) ? 'height' : 'width'] = size;
	}

	/**
	 * Resize the knob
	 * Set the height of the knob depending on the scroll height
	 * Hide the scrollbar when there is no scroll the the scroll content
	 *
	 * @method resizeKnob
	 */
	private resizeKnob(): void {
		if (this.getWrapperSize() > 0 && this.getScrollSize() > 0) {
			this.getBarSize();
			this._knob.style[this._options.horizontal ? 'width' : 'height'] = Math.round(
				Math.max(20, this._barSize * (this.getWrapperSize() / this.getScrollSize()))) + 'px';
		}

		if (!this._options.hidebar && this._overflowSize === 0) {
			TweenLite.to(this._bar, 0.2, { opacity: 0 });
		} else {
			if (!this._options.hidebar && this._overflowSize !== 0) {
				TweenLite.to(this._bar, 0.2, { opacity: 1 });
			}
		}
	}

	/**
	 * Animate knob to opacity 1 if hidebar option is set to true and if scroll is possible
	 *
	 * @method showKnob
	 */
	private showKnob(): void {
		if (this._options.hidebar && this._overflowSize > 0) {
			clearTimeout(this._hideTimer);

			TweenLite.to(this._bar, 0.2, { opacity: 1 });
			TweenLite.to(this._knob, 0.2, { autoAlpha: 1 });
		}
	}

	/**
	 * Animate bar and knob to opacity 0 if hidebar option is set to true
	 *
	 * @method hideKnob
	 * @param disableTween<boolean> indicating if it should animate or set to opacity 0
	 */
	private hideKnob(disableTween: boolean = false): void {
		if (this._options.hidebar) {
			TweenLite.to(this._bar, disableTween ? 0 : 0.2, { opacity: 0 });
			TweenLite.to(this._knob, disableTween ? 0 : 0.2, { autoAlpha: 0 });
		}
	}

	/**
	 * Start hide knob timer if hidebar option is set to true
	 *
	 * @method startHideKnob
	 */
	private startHideKnob(): void {
		if (this._options.hidebar) {
			clearTimeout(this._hideTimer);

			this._hideTimer = setTimeout(() => {
				this.hideKnob();
			}, this._options.hideBarTime);
		}
	}

	/**
	 * Scroll the content to the value
	 *
	 * @method scrollTo
	 * @param value<number> new scroll position
	 */
	private scrollTo(value: number = 0): void {
		this._content[this._options.horizontal ? 'scrollLeft' : 'scrollTop'] = value;
	}

	/**
	 * Get the size (width/height) of the scroll wrapper, depending on the type of scroll(vertical/horizontal)
	 * Horizontal returns width
	 * Vertical returns height
	 *
	 * @method getWrapperSize
	 * @returns {number}
	 */
	private getWrapperSize(): number {
		return this.element.getBoundingClientRect()[this._options.horizontal ? 'width' : 'height'];
	}

	/**
	 * Get the opposite size (width/height) of the scroll wrapper, depending on the type of scroll(vertical/horizontal)
	 * Horizontal returns height
	 * Vertical returns width
	 *
	 * @method getWrapperSizeOpposite
	 * @returns {number}
	 */
	private getWrapperSizeOpposite(): number {
		return this.element.getBoundingClientRect()[this._options.horizontal ? 'height' : 'width'];
	}

	/**
	 * Get the scroll width or height of the scroll content, depending on the type of scroll(vertical/horizontal)
	 * Horizontal returns scroll width
	 * Vertical returns scroll height
	 *
	 * @method getScrollSize
	 * @returns {any}
	 */
	private getScrollSize(): number {
		return this._content[this._options.horizontal ? 'scrollWidth' : 'scrollHeight'];
	}

	/**
	 * Get the size of the bar and safe it to the variable this._barSize
	 * Type scroll horizontal gets width
	 * Type scroll vertical gets height
	 *
	 * @method getBarSize
	 */
	private getBarSize(): void {
		this._barSize = this._bar.getBoundingClientRect()[this._options.horizontal ? 'width' : 'height'];
	}

	/**
	 * Get the opposite size of the bar and safe it to the variable this._barSizeOpposite
	 * Type scroll horizontal gets height
	 * Type scroll vertical gets width
	 *
	 * @method getBarSizeOpposite
	 */
	private getBarSizeOpposite(): void {
		this._barSizeOpposite = this._bar.getBoundingClientRect()[this._options.horizontal ? 'height' : 'width'];
	}

	/**
	 * Get the size of the knob and safe it to the variable this._knobSize
	 * Type scroll horizontal gets width
	 * Type scroll vertical gets height
	 *
	 * @method getKnobSize
	 */
	private getKnobSize(): void {
		this._knobSize = this._knob.getBoundingClientRect()[this._options.horizontal ? 'width' : 'height'];
	}

	public destruct(): void {
		this._isDestructed = true;

		if (this._dragInstance) {
			this._dragInstance.disable();
			this._dragInstance = null;
		}

		if (this._hideTimer) {
			clearTimeout(this._hideTimer);
			this._hideTimer = null;
		}

		window.removeEventListener('resize', this._resizeEvent);
		this._resizeEvent = null;

		this._content.removeEventListener('scroll', this._scrollEvent);
		this._scrollEvent = null;

		this._content = null;
		this._contentInner = null;
		this._bar = null;
		this._knob = null;
		this._isDragging = null;
		this._overflowSize = null;
		this._barSize = null;
		this._barSizeOpposite = null;
	}
}

export default Scrollbar;
