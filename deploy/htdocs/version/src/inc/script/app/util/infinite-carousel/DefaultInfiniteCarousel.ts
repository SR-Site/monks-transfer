import EventDispatcher from "../../../lib/temple/event/EventDispatcher";
import CallbackCounter from "../CallbackCounter";
import DestructibleHelper from "../../../lib/temple/core/DestructibleHelper";
import CarouselEvent from "./event/CarouselEvent";
import Promise = require("bluebird");
import CommonEvent from "../../../lib/temple/event/CommonEvent";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";

/**
 * @class DefaultInfiniteCarousel
 * @description The base for a infinite carousel it has all the default functionality that is required to make it work.
 */
abstract class DefaultInfiniteCarousel extends EventDispatcher
{
	public callbackCounter: CallbackCounter = new CallbackCounter();

	private _sliderViewPort: HTMLElement;
	private _sliderWrapper: HTMLElement;
	private _slides: Array<HTMLElement>;

	private _isDragging: boolean = false;

	private _currentPage: KnockoutObservable<number> = ko.observable(0);
	private _realCurrentPage: KnockoutComputed<number>;
	private _previousPage: number = 0;
	private _nextPage: number = 0;

	private _activated: boolean = true;
	private _isFixedHeight: boolean = true;

	private _positions: Array<number> = [];
	private _draggableInstance: Draggable;
	private _destructibles: DestructibleHelper = new DestructibleHelper();

	constructor(sliderViewPort: HTMLElement)
	{
		super();

		this._sliderViewPort = sliderViewPort;
		this._sliderWrapper = <HTMLElement>this._sliderViewPort.querySelector('.slides');
		this._slides = Array.prototype.slice.call(this._sliderWrapper.querySelectorAll('.slide'));

		// Listen to the current page change
		this._destructibles.addKOSubscription(this._currentPage.subscribe(this.handlePageChange.bind(this)));

		// Convert the current page to a number between 0 and the amount of items
		this._realCurrentPage = ko.computed(() => this.getCurrentPageIndex(this._currentPage()));

		// Wait  for all slider components to be loaded
		const allComponentsLoaded: Promise<any> = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

		// Init the draggable when all components are loaded
		allComponentsLoaded.then(() => this.allComponentsLoaded());

		this._destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 250, this)));
	}

	/**
	 * @public
	 * @method set fixedHeight
	 */
	public set fixedHeight(fixed: boolean)
	{
		this._isFixedHeight = fixed;
	}

	/**
	 * @public
	 * @method get currentPage
	 * @returns {KnockoutObservable<number>}
	 */
	public get realCurrentPage(): KnockoutObservable<number>
	{
		return this._realCurrentPage;
	}

	/**
	 * @public
	 * @method next
	 * @description Method to open the next page
	 */
	public next(): void
	{
		const page = this._currentPage() + 1;

		this._nextPage = page;
		this._currentPage(page);
		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method previous
	 * @description Method to open the previous page
	 */
	public previous(): void
	{
		const page = this._currentPage() - 1;

		this._nextPage = page;
		this._currentPage(page);
		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method targetIndex
	 * @param targetIndex
	 * @description Method to open a desired index
	 */
	public open(targetIndex: number): void
	{
		if(targetIndex === this._currentPage())
		{
			return;
		}

		const realIndex = this.getCurrentPageIndex();
		const currentPos = this._positions[realIndex];
		const newPos = this._positions[targetIndex];
		const posDifference = Math.abs(newPos - currentPos) / 100;

		// Calculate new page index, either add or subtract the difference
		const page = newPos > currentPos ? this._currentPage() + posDifference : this._currentPage() - posDifference;

		this._nextPage = page;
		this._currentPage(page);

		this.checkPageReposition();
	}

	/**
	 * @public
	 * @method activate
	 */
	public activate(): void
	{
		if(!this._activated)
		{
			this._activated = true;

			this.setSlidesOnInit();

			if(this._draggableInstance)
			{
				this._draggableInstance.enabled(true);
			}

			this.handleResize();
		}

		this.handleResize();
	}

	/**
	 * @public
	 * @method deactivate
	 */
	public deactivate(): void
	{
		if(this._activated)
		{
			this._activated = false;

			if(this._draggableInstance)
			{
				this._draggableInstance.enabled(false);
			}

			this._positions = [];
			this._currentPage(null);
			this._nextPage = 0;
			this._previousPage = 0;

			this._slides.forEach((item: HTMLElement) =>
			{
				TweenLite.set(item, {clearProps: 'all'});
			});

			TweenLite.set(this._sliderWrapper, {height: 'auto'});
		}
	}

	/**
	 * @protected
	 * @method handleResize
	 */
	protected handleResize(): void
	{
		var height: number = 0;

		if(!this._isFixedHeight)
		{
			TweenLite.set(this._slides, {height: 'auto'});

			this._slides.forEach((item: HTMLElement) =>
			{
				height = Math.max(height, item.offsetHeight);
			});

			TweenLite.set(this._sliderWrapper, {height: height});
		}
		else
		{
			this._slides.forEach((slide: HTMLElement) =>
			{
				slide.style.removeProperty('height');
			});

			this._sliderWrapper.style.removeProperty('height');
		}
	}

	/**
	 * @private
	 * @method setSlidesOnInit
	 * @description Method to position all the slides on initial load.
	 */
	private setSlidesOnInit(): void
	{
		this._slides.forEach((slide, index) =>
		{
			const position = index * 100;
			this._positions.push(position);

			TweenLite.set(slide, {x: position + '%'})
		});
	}

	/**
	 * @private
	 * @method handleResize
	 * @description Method that's triggered after all the components are loaded. It will position the slides and initialize the draggable instance
	 */
	private allComponentsLoaded(): void
	{
		this.setSlidesOnInit();
		this.createDraggableInstance();

		this.dispatch(CommonEvent.LOADED);

	}

	/**
	 * @private
	 * @method handleDrag
	 * @description Method that get's triggerd when a user drags the slider
	 */
	private handleDrag(): void
	{
		this._isDragging = true;

		this.setCurrentPageOnDrag();
	}

	/**
	 * @private
	 * @method setCurrentPageOnDrag
	 * @description Method that set's  the current page based on the x position of the draggable instance
	 */
	private setCurrentPageOnDrag(): void
	{
		const elementWidth = this._sliderWrapper.offsetWidth;
		const currentX = this._currentPage() * elementWidth;

		if(this._draggableInstance.x + currentX < currentX)
		{
			this._nextPage = this._currentPage() + 1;
		}
		else
		{
			this._nextPage = this._currentPage() - 1;
		}

		this.checkPageReposition();
	}

	/**
	 * @private
	 * @method handleDragEnd
	 * @description Method that get's fired on drag end and checks to what position the slider needs to be animated.
	 */
	private handleDragEnd(): void
	{
		this._isDragging = false;

		const elementWidth = this._sliderWrapper.offsetWidth;
		const currentX = this._currentPage() * elementWidth;

		if(
			this._draggableInstance.x > -elementWidth / 8 &&
			this._draggableInstance.x < elementWidth / 8)
		{
			this.setSliderPosition();
			return;
		}

		if(this._draggableInstance.x + currentX < currentX)
		{
			this._currentPage(this._currentPage() + 1);
		}
		else
		{
			this._currentPage(this._currentPage() - 1);
		}
	}

	/**
	 * @private
	 * @method checkPageReposition
	 * @description Method that checks a page needs to be re-positioned to make the slider "infinte"
	 */
	private checkPageReposition(): void
	{
		const position: number = (this._nextPage * 100);
		const nextElementKey = (this.getCurrentPageIndex() + this._slides.length) % this._slides.length;

		let nextElement: HTMLElement = this._slides[nextElementKey];
		let nextElementPosition: number = this._positions[nextElementKey];

		if(this.needsReposition(position, nextElementPosition))
		{
			TweenLite.set(nextElement, {x: position + '%'});

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
	private needsReposition(position: number, nextElementPosition: number): boolean
	{
		return (this._nextPage > this._previousPage && nextElementPosition < position) ||
			(this._nextPage < this._previousPage && nextElementPosition > position)
	}

	/**
	 * Returns the index of the current paged normalized to one of the indexes of the
	 * array of children. This is needed because _currentPage can increase and decrease beyond
	 * the bounds of the array.
	 * @returns {number} The true index of the current page
	 */
	private getCurrentPageIndex(page: number = this._nextPage): number
	{
		const numItems = this._slides.length;

		while(page < 0)
		{
			page += numItems;
		}

		return page % numItems;
	}

	/**
	 * @method setSliderPosition
	 * @description Animate the slider position to the currentPage index.
	 */
	private setSliderPosition(): void
	{
		TweenLite.to(
			this._sliderWrapper,
			1,
			{
				x: ((this._currentPage() * 100) * -1) + '%',
				onUpdate: ()=> this.setCurrentPageOnDrag(),
				ease: Expo.easeOut
			}
		);

		this._previousPage = this._currentPage();
		this._nextPage = this._currentPage();
	}

	/**
	 * @private
	 * @method handlePageChange
	 */
	private handlePageChange(): void
	{
		this.checkPageReposition();
		this.setSliderPosition();

		// Notify parent classes about the change
		this.dispatch(CarouselEvent.CHANGE, {index: this.getCurrentPageIndex()});
	}

	/**
	 * @private
	 * @method createDraggableInstance
	 */
	private createDraggableInstance(): void
	{
		this._draggableInstance = Draggable.create(this._sliderWrapper, {
			type: 'x',
			dragClickables: true,
			zIndexBoost: false,
			minimumMovement: 6,
			onDrag: this.handleDrag.bind(this),
			onDragEnd: this.handleDragEnd.bind(this)
		})[0];

		this._draggableInstance.enabled(this._activated);
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		if(this._draggableInstance)
		{
			this._draggableInstance.kill();
			this._draggableInstance = null;
		}

		if(this._destructibles)
		{
			this._destructibles.destruct();
			this._destructibles = null;
		}

		this._realCurrentPage = null;
		this._currentPage = null;
		this._nextPage = null;
		this._previousPage = null;
		this._positions = null;
		this._sliderViewPort = null;
		this._sliderWrapper = null;
		this._slides = null;

		super.destruct();
	}
}

export default DefaultInfiniteCarousel;
