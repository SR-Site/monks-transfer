import sengEvent from 'seng-event';
import { Linear, TweenLite } from 'gsap';
import Draggable from 'gsap/Draggable';
import { debounce } from 'lodash';
import NativeEventListener from 'util/event/NativeEventListener';
import bowser from 'bowser';
import DraggableInstanceEvent from 'util/draggableInstance/DraggableInstanceEvent';
import DisposableHelper from 'util/event/DisposableHelper';
import ThrowPropsPlugin from '../../vendor/gsap/plugin/ThrowPropsPlugin';

/**
 * @class DraggableInstance
 * @description We created this class because we were re-typing this code a lot of times. Instead of setting up a
 *     draggable instance binding the on throw updates time after time again we decided on 1 instance that functions
 *     the same every time. It allows for a couple of parameters that were different on the instances.
 */
class DraggableInstance extends sengEvent {
	// Class names
	private static _DRAGGABLE_ELEMENT_CLASS = 'js-draggable-element';
	private static _DRAGGABLE_DISABLED_CLASS = 'is-disabled';

	private _mouseWheelTimeout: number;
	private _cancelMouseWheel: boolean = false;
	private _draggableInstance: Draggable;
	private _draggableContainer: HTMLElement;
	private _draggableElement: HTMLElement;
	private _progress: number = 0;
	private _enabled: boolean = true;
	private _disposables: DisposableHelper = new DisposableHelper();
	private _options: IDraggableInstanceOptions = {
		invert: false,
		maxDuration: 1,
		minDuration: 1,
		throwResistance: 1000,
		dragClickables: true,
		dragResistance: 0,
		enableTrackPad: false,
		snap: {
			x: 0,
			element: null,
		},
	};

	constructor(draggableContainer: HTMLElement, options: IDraggableInstanceOptions = {}) {
		super();

		ThrowPropsPlugin;

		this._options = Object.assign(this._options, options);

		this._disposables.add(new NativeEventListener(
			window,
			'resize',
			debounce(this.handleResize.bind(this), 100, this),
		));
		this._disposables.add(new NativeEventListener(
			window,
			'orientationchange',
			debounce(this.handleResize.bind(this), 100, this),
		));

		this._draggableContainer = draggableContainer;
		this._draggableElement = <HTMLElement>draggableContainer.querySelector('.' + DraggableInstance._DRAGGABLE_ELEMENT_CLASS);

		if (bowser.mac && this._options.enableTrackPad) {
			this._draggableContainer.addEventListener('wheel', this.onScrollContainerWheel.bind(this));

		}

		this.createDraggableInstance();
		this.update();
	}

	/**
	 * @public
	 * @method setSnapPosition
	 */
	public setSnapPosition(xPos: number): void {
		this._options.snap.x = xPos;
	}

	/**
	 * @public
	 * @method set allowDragging
	 * @param allow
	 */
	public set enabled(allow: boolean) {
		this._enabled = allow;
		this._draggableInstance.enabled(allow);

		if (allow) {
			this._draggableContainer.classList.remove(DraggableInstance._DRAGGABLE_DISABLED_CLASS);
		}
		else {
			this._draggableContainer.classList.add(DraggableInstance._DRAGGABLE_DISABLED_CLASS);
		}
	}

	/**
	 * @public
	 * @method get allowDragging
	 */
	public get enabled(): boolean {
		return this._enabled;
	}

	/**
	 * @public
	 * @method get x
	 * @returns {number}
	 */
	public get x(): number {
		return this._draggableInstance.x;
	}

	/**
	 * @public
	 * @method update
	 * @param progress
	 */
	public update(progress?: number) {
		if (progress !== void 0) {
			this._progress = progress;
			this.progress = this._progress;
		}

		this.checkDragging();

		this.handleResize();
	}

	/**
	 * @public
	 * @method set position
	 * @param progress
	 */
	public set progress(progress: number) {
		TweenLite.set(this._draggableElement, {
			x: this.maxX * progress,
			onComplete: () => {
				this._progress = progress;
				this._draggableInstance.update();
			},
		});
	}

	/**
	 * @public
	 * @method animateProgress
	 * @param progress
	 * @param duration
	 * @param ease
	 */
	public animateProgress(progress: number, duration: number = 1, ease: any = Linear.easeNone): void {
		TweenLite.to(
			this._draggableElement,
			duration,
			{
				x: this.maxX * progress,
				ease: ease,
				onStart: () => this.handleDragStart(),
				onUpdate: () => {
					// keep track of the progress
					this._progress = Math.min(1, Math.max(0, this._draggableInstance.x / this.maxX));

					// Update the instance
					this._draggableInstance.update();

					// Notify the parents
					this.dispatchEvent(
						new DraggableInstanceEvent(
							DraggableInstanceEvent.UPDATE,
							{
								progress: this._progress,
							},
						),
					);
				},
				onComplete: () => {
					this.dispatchEvent(
						new DraggableInstanceEvent(
							DraggableInstanceEvent.COMPLETE,
							{
								progress: this._progress,
							},
						),
					);
				},
			},
		);
	}

	/**
	 * @public
	 * @method get progress
	 */
	public get progress() {
		return this._progress;
	}

	/**
	 * @private
	 * @method onScrollContainerWheel
	 */
	private onScrollContainerWheel(event: WheelEvent): void {
		const deltaX = Math.abs(event.deltaX);
		const deltaY = Math.abs(event.deltaY);

		if (deltaX > deltaY) {
			// Always disable the default scroll event
			event.preventDefault();

			if (this._enabled && !this._cancelMouseWheel) {
				let currentX = this._draggableInstance.x;
				let containerWidth = this._draggableContainer.offsetWidth;
				let maxScrollWidth = this._draggableElement.offsetWidth;

				// Calculate the new x position
				let newX = Math.min(0, Math.max((maxScrollWidth - containerWidth) / -1, currentX + event.deltaX));

				if (
					(this._progress > 0 && this._progress < 1) ||
					(this._progress === 0 && newX < this._draggableInstance.x) ||
					(this._progress === 1 && newX > this._draggableInstance.x)
				) {
					// Start mousewheeling means start drag
					if (this._mouseWheelTimeout === null) {
						this.handleDragStart();
					}

					// Update the x pos based on the delta
					TweenLite.set(this._draggableElement, { x: newX });

					this.handleDrag();

					clearTimeout(this._mouseWheelTimeout);
					this._mouseWheelTimeout = setTimeout(this.handleMouseWheelEnd.bind(this), 250);
				}
			}
		}
	}

	/**
	 * @private
	 * @method handleMouseWheelEnd
	 */
	private handleMouseWheelEnd(): void {
		this._mouseWheelTimeout = null;

		if (this._options.snap.element) {
			this._cancelMouseWheel = true;

			TweenLite.to(this._draggableElement, 0.2, {
				x: this.getSnapPosition(this._draggableInstance.x),
				onUpdate: this.handleDrag.bind(this),
				onComplete: () => {
					this._cancelMouseWheel = false;

					this.handleDragEnd();
					this.handleThrowComplete();
				},
			});
		}
		else {
			this.handleDrag();
			this.handleDragEnd();
			this.handleThrowComplete();
		}
	}

	/**
	 * @private
	 * @method createDraggableInstance
	 */
	private createDraggableInstance(): void {
		this._draggableInstance = Draggable.create(
			this._draggableElement,
			{
				type: 'x',
				throwProps: true,
				dragClickables: this._options.dragClickables,
				// edgeResistance: 1,
				zIndexBoost: false,
				maxDuration: this._options.maxDuration,
				minDuration: this._options.minDuration,
				throwResistance: this._options.throwResistance,
				dragResistance: this._options.dragResistance,
				snap: {
					x: this.getSnapPosition.bind(this),
				},
				onDrag: this.handleDrag.bind(this),
				onDragEnd: this.handleDragEnd.bind(this),
				onThrowUpdate: this.handleDrag.bind(this),
				onDragStart: this.handleDragStart.bind(this),
				allowNativeTouchScrolling: (bowser.mobile || bowser.tablet) ? true : false,
				onThrowComplete: () => {
					this.handleThrowComplete();
					this.handleDrag();
				},
			},
		)[0];
	}

	/**
	 * @private
	 * @method getSnapPosition
	 * @param position
	 * @returns {number}
	 */
	private getSnapPosition(position: number): number {
		let snapX = this._options.snap.x;

		if (this._options.snap.element) {
			snapX = this._options.snap.element.offsetWidth;
		}

		return Math.round(position / snapX) * snapX;
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void {
		if (!this.isDisposed) {
			this._draggableInstance.update(true);
		}
	}

	/**
	 * @private
	 * @method handleDrag
	 */
	private handleDrag(): void {
		// Check for the bounds
		if (
			this._options.invert && this._draggableInstance.x > 0 ||
			!this._options.invert && this._draggableInstance.x < 0
		) {
			this.progress = 0;
		}
		else {
			if
			(
				this._options.invert && this._draggableInstance.x < this.maxX ||
				!this._options.invert && this._draggableInstance.x > this.maxX
			) {
				this.progress = 1;
			}
		}

		// Update the instance
		this._draggableInstance.update();

		// keep track of the progress
		this._progress = Math.min(1, Math.max(0, this._draggableInstance.x / this.maxX));

		// Notify the parents
		this.dispatchEvent(
			new DraggableInstanceEvent(
				DraggableInstanceEvent.UPDATE,
				{
					progress: this._progress,
				},
			),
		);

		// Dispatch if we reached the end
		if (this._progress === 1 || this._progress === 0) {
			this.handleThrowComplete();
		}
	}

	/**
	 * @private
	 * @method handleThrowComplete
	 */
	private handleThrowComplete(): void {
		this.dispatchEvent(
			new DraggableInstanceEvent(
				DraggableInstanceEvent.THROW_COMPLETE,
				{
					progress: this._progress,
				},
			),
		);
	}

	/**
	 * @private
	 * @method handleDragEnd
	 */
	private handleDragEnd(): void {
		this.dispatchEvent(
			new DraggableInstanceEvent(
				DraggableInstanceEvent.DRAG_END,
			),
		);
	}

	/**
	 * @private
	 * @method handleDragStart
	 */
	private handleDragStart(): void {
		this.dispatchEvent(
			new DraggableInstanceEvent(
				DraggableInstanceEvent.DRAG_START,
			),
		);
	}

	/**
	 * @private
	 * @method get maxX
	 * @returns {number}
	 */
	public get maxX(): number {
		return this._draggableContainer.offsetWidth - this._draggableElement.offsetWidth;
	}

	/**
	 * @private
	 * @method checkDragging
	 */
	private checkDragging(): void {
		this.enabled = this._options.invert ? this.maxX < 0 : this.maxX > 0;
	}

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		this._draggableContainer = null;
		this._draggableElement = null;
		this._progress = null;
		this._options = null;

		if (this._draggableInstance) {
			this._draggableInstance.kill();
			this._draggableInstance = null;
		}

		super.dispose();
	}
}

export interface IDraggableInstanceOptions {
	invert?: boolean;
	maxDuration?: number;
	enableTrackPad?: boolean;
	minDuration?: number;
	throwResistance?: number;
	dragClickables?: boolean;
	dragResistance?: number;
	snap?: { x?: number; element?: HTMLElement; };
}

export interface IDraggableEventData {
	progress: number;
}

export default DraggableInstance;
