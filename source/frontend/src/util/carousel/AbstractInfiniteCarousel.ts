import CarouselEvent from './event/CarouselEvent';
import sengEvent from 'seng-event';
import debounce from 'lodash/debounce';
import { Expo, TweenLite } from 'gsap';
import Draggable from 'gsap/Draggable';

/**
 * @class DefaultInfiniteCarousel
 * @description The base for a infinite carousel it has all the default functionality that is required to make it work.
 */
abstract class AbstractInfiniteCarousel extends sengEvent {
	private _isDragging: boolean = false;

	private _currentPage: number = 0;
	private _realCurrentPage: number = 0;
	private _previousPage: number = 0;
	private _nextPage: number = 0;

	private _autoplayInterval: number = null;

	private _activated: boolean = true;
	private _isFixedHeight: boolean = true;
	private _handleResizeListener: () => void;

	private _options: IDefaultInfinitCarouselOptions = {
		autoplay: false,
		autoplayDuration: 5000,
		slides: [],
		sliderWrapper: null,
	};

	private _positions: Array<number> = [];
	private _draggableInstance: Draggable;

	constructor(options: IDefaultInfinitCarouselOptions) {
		super();

		this._options = Object.assign(this._options, options);

		// Add Resize Listener to the window.
		this._handleResizeListener = debounce(this.handleResize.bind(this), 500);
		window.addEventListener('resize', this._handleResizeListener);

		this.setSlidesOnInit();
		this.createDraggableInstance();
		this.disableIfNotEnoughSlides();
		this.handleResize();
		this.startAutoplayInterval();
	}

	/**
	 * @public
	 * @method clearAutoplayInterval
	 */
	public clearAutoplayInterval(): void {
		if (this._autoplayInterval) {
			clearInterval(this._autoplayInterval);
			this._autoplayInterval = null;
		}
	}

	/**
	 * @public
	 * @method startAutoplayInterval
	 */
	public startAutoplayInterval(): void {
		if (this._options.autoplay && this._autoplayInterval == null && this._options.slides.length > 1) {
			this._autoplayInterval = window.setInterval(() => {
				this.next();
			}, this._options.autoplayDuration);
		}
	}

	/**
	 * @public
	 * @method set fixedHeight
	 */
	public set fixedHeight(fixed: boolean) {
		this._isFixedHeight = fixed;
	}

	/**
	 * @public
	 * @method get currentPage
	 * @returns {KnockoutObservable<number>}
	 */
	public get realCurrentPage(): number {
		return this._realCurrentPage;
	}

	/**
	 * @public
	 * @method get activated
	 * @returns {boolean}
	 */
	public get activated(): boolean {
		return this._activated;
	}

	/**
	 * @private
	 * @method setCurrentPage
	 */
	private setCurrentPage(index): void {
		this._currentPage = index;
		this._realCurrentPage = this.getCurrentPageIndex(this._currentPage);
		this.handlePageChange();
	}

	/**
	 * @public
	 * @method next
	 * @description Method to open the next page
	 */
	public next(): void {
		const page = this._currentPage + 1;

		this._nextPage = page;
		this.setCurrentPage(page);
		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method previous
	 * @description Method to open the previous page
	 */
	public previous(): void {
		const page = this._currentPage - 1;

		this._nextPage = page;
		this.setCurrentPage(page);
		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method targetIndex
	 * @param targetIndex
	 * @description Method to open a desired index
	 */
	public open(targetIndex: number): void {
		if (targetIndex === this._currentPage) {
			return;
		}

		const realIndex = this.getCurrentPageIndex();
		const currentPos = this._positions[realIndex];
		const newPos = this._positions[targetIndex];
		const posDifference = Math.abs(newPos - currentPos) / 100;

		// Calculate new page index, either add or subtract the difference
		const page = newPos > currentPos ? this._currentPage + posDifference : this._currentPage - posDifference;

		this._nextPage = page;

		this.setCurrentPage(page);

		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method disableInteraction
	 */
	public disableInteraction(): void {
		if (this._draggableInstance) {
			this._draggableInstance.enabled(false);
		}
	}

	/**
	 * @public
	 * @method enableInteraction
	 */
	public enableInteraction(): void {
		if (this._draggableInstance) {
			this._draggableInstance.enabled(true);
		}
	}

	/**
	 * @public
	 * @method activate
	 */
	public activate(): void {
		if (!this._activated) {
			this._activated = true;

			this.setSlidesOnInit();
			this.enableInteraction();
			this.handleResize();
		}

		this.handleResize();
	}

	/**
	 * @public
	 * @method reinit
	 */
	public reinit(options: IDefaultInfinitCarouselOptions): void {
		this._options = Object.assign(this._options, options);

		this.setSlidesOnInit();
		this.enableInteraction();
		this.setCurrentPage(0);
		this.handleResize();
		this.setActivateOrDeactivate();
	}

	/**
	 * @public
	 * @method deactivate
	 */
	public deactivate(): void {
		if (this._activated) {
			this._activated = false;

			this.disableInteraction();
			TweenLite.set(this._options.sliderWrapper, {
				height: 'auto',
				clearProps: 'all',
			});
			this._positions = [];
			this.setCurrentPage(null);
			this._nextPage = 0;
			this._previousPage = 0;

			this._options.slides.forEach((item: HTMLElement) => {
				TweenLite.set(item, {
					clearProps: 'all',
				});
			});
		}
	}

	/**
	 * @protected
	 * @method handleResize
	 */
	protected handleResize(): void {
		if (this.isDisposed()) {
			return;
		}

		let newHeight: number = 0;

		if (!this._isFixedHeight) {
			TweenLite.set(this._options.slides, {
				height: 'auto',
			});

			this._options.slides.forEach((item: HTMLElement) => {
				newHeight = Math.max(newHeight, item.offsetHeight);
			});

			TweenLite.set(this._options.sliderWrapper, {
				height: newHeight,
			});
		} else {
			this._options.slides.forEach((slide: HTMLElement) => {
				slide.style.removeProperty('height');
			});

			this._options.sliderWrapper.style.removeProperty('height');
		}
	}

	/**
	 * @private
	 * @method disableIfNotEnoughSlides
	 */
	private disableIfNotEnoughSlides(): void {
		if (this._options.slides.length === 1) {
			// One slide is not enough!
			this.deactivate();
		}
	}

	/**
	 * @private
	 * @method disableIfNotEnoughSlides
	 */
	private setActivateOrDeactivate(): void {
		if (this._options.slides.length === 1) {
			// One slide is not enough!
			this.deactivate();
		} else {
			this.activate();
		}
	}

	/**
	 * @private
	 * @method setSlidesOnInit
	 * @description Method to position all the slides on initial load.
	 */
	private setSlidesOnInit(): void {
		this._options.slides.forEach((slide, index) => {
			const position = index * 100;
			this._positions.push(position);

			TweenLite.set(slide, {
				x: position + '%',
			});
		});
	}

	/**
	 * @private
	 * @method handleDrag
	 * @description Method that get's triggerd when a user drags the slider
	 */
	private handleDrag(): void {
		this._isDragging = true;

		this.setCurrentPageOnDrag();
	}

	/**
	 * @private
	 * @method setCurrentPageOnDrag
	 * @description Method that set's  the current page based on the x position of the draggable instance
	 */
	private setCurrentPageOnDrag(): void {
		const elementWidth = this._options.sliderWrapper.offsetWidth;
		const currentX = this._currentPage * elementWidth;

		if (this._draggableInstance.x + currentX < currentX) {
			this._nextPage = this._currentPage + 1;
		} else {
			this._nextPage = this._currentPage - 1;
		}

		this.checkPageReposition();
	}

	/**
	 * @private
	 * @method handleDragEnd
	 * @description Method that get's fired on drag end and checks to what position the slider needs to be animated.
	 */
	private handleDragEnd(): void {
		const elementWidth = this._options.sliderWrapper.offsetWidth;
		const currentX = this._currentPage * elementWidth;

		if (this._draggableInstance.x > -elementWidth / 8 && this._draggableInstance.x < elementWidth / 8) {
			this.setSliderPosition();
			return;
		}

		if (this._draggableInstance.x + currentX < currentX) {
			this.setCurrentPage(this._currentPage + 1);
		} else {
			this.setCurrentPage(this._currentPage - 1);
		}

		this._isDragging = false;
	}

	/**
	 * @private
	 * @method checkPageReposition
	 * @description Method that checks a page needs to be re-positioned to make the slider "infinte"
	 */
	private checkPageReposition(): void {
		const position: number = this._nextPage * 100;
		const nextElementKey = (this.getCurrentPageIndex() + this._options.slides.length) % this._options.slides.length;

		const nextElement: HTMLElement = this._options.slides[nextElementKey];
		const nextElementPosition: number = this._positions[nextElementKey];

		if (this.needsReposition(position, nextElementPosition)) {
			TweenLite.set(nextElement, {
				x: position + '%',
			});

			this._positions[nextElementKey] = position;
		}
	}

	/**
	 * Helper method for checkPageReposition that will check if the next element needs to
	 * be repositioned.
	 * @param position The position of the current element
	 * @param nextElementPosition The position of the next element (to the right) of the current
	 * element.
	 * @returns {boolean} True if the next element needs to be repositioned
	 */
	private needsReposition(position: number, nextElementPosition: number): boolean {
		return (
			(this._nextPage > this._previousPage && nextElementPosition < position) ||
			(this._nextPage < this._previousPage && nextElementPosition > position)
		);
	}

	/**
	 * Returns the index of the current paged normalized to one of the indexes of the
	 * array of children. This is needed because _currentPage can increase and decrease beyond
	 * the bounds of the array.
	 * @returns {number} The true index of the current page
	 */
	private getCurrentPageIndex(page: number = this._nextPage): number {
		let currentPageIndex = page;

		const numItems = this._options.slides.length;

		while (currentPageIndex < 0) {
			currentPageIndex += numItems;
		}

		return currentPageIndex % numItems;
	}

	/**
	 * @method setSliderPosition
	 * @description Animate the slider position to the currentPage index.
	 */
	private setSliderPosition(): void {
		const updateOnDrag = this._isDragging;

		TweenLite.to(this._options.sliderWrapper, 1, {
			x: this._currentPage * 100 * -1 + '%',
			onUpdate: () => {
				// if(updateOnDrag)
				// {
				// 	this.setCurrentPageOnDrag();
				// }
			},
			ease: Expo.easeOut,
		});

		this._previousPage = this._currentPage;
		this._nextPage = this._currentPage;
	}

	/**
	 * @private
	 * @method handlePageChange
	 */
	private handlePageChange(): void {
		this.clearAutoplayInterval();
		this.startAutoplayInterval();

		this.checkPageReposition();
		this.setSliderPosition();

		// Notify parent classes about the change
		this.dispatchEvent(
			new CarouselEvent(CarouselEvent.CHANGE, {
				index: this._realCurrentPage,
			}),
		);
	}

	/**
	 * @private
	 * @method createDraggableInstance
	 */
	private createDraggableInstance(): void {
		this._draggableInstance = Draggable.create(this._options.sliderWrapper, {
			type: 'x',
			dragClickables: true,
			zIndexBoost: false,
			minimumMovement: 6,
			onDrag: this.handleDrag.bind(this),
			onDragEnd: this.handleDragEnd.bind(this),
		})[0];

		this._draggableInstance.enabled(this._activated);

		if (this._options.slides.length < 2) {
			this.disableInteraction();
		}
	}

	/**
	 * @public
	 * @method destruct
	 */
	public dispose(): void {
		if (this._handleResizeListener !== void 0) {
			window.removeEventListener('resize', this._handleResizeListener);
			this._handleResizeListener = void 0;
		}

		this.clearAutoplayInterval();

		if (this._draggableInstance) {
			this._draggableInstance.kill();
			this._draggableInstance = null;
		}

		if (this._options.sliderWrapper) {
			TweenLite.set(this._options.sliderWrapper, {
				clearProps: 'height, x',
			});
		}

		if (this._options.slides) {
			TweenLite.set(this._options.slides, {
				clearProps: 'height, x',
			});
		}

		this._realCurrentPage = null;
		this._currentPage = null;
		this._nextPage = null;
		this._previousPage = null;
		this._positions = null;
		this._options.sliderWrapper = null;
		this._options.slides = null;

		super.dispose();
	}
}

export default AbstractInfiniteCarousel;

export interface IDefaultInfinitCarouselOptions {
	sliderWrapper: HTMLElement;
	slides: Array<HTMLElement>;
	autoplay?: boolean;
	autoplayDuration?: number;
}
