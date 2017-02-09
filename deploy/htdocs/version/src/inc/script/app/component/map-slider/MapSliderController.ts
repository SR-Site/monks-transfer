import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import MapSliderTransitionController from "app/component/map-slider/MapSliderTransitionController";
import IMapSliderOptions from "app/component/map-slider/IMapSliderOptions";
import MapSliderViewModel from "app/component/map-slider/MapSliderViewModel";
import Log from "lib/temple/util/Log";
import CommonEvent from "../../../lib/temple/event/CommonEvent";
import bowser = require('bowser');

class MapSliderController extends AbstractTransitionComponentController<MapSliderViewModel, IMapSliderOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.MapSlider');

	private _draggableInstance: Draggable;

	private _knob: HTMLElement;
	private _bounds: HTMLElement;
	private _stepCount: number;
	private _gridSize: number;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
		this.transitionController = new MapSliderTransitionController(this.element, this);

		this._stepCount = this.element.querySelectorAll('.steps li').length - 1;
		this._knob = <HTMLElement>this.element.querySelector('.knob');
		this._bounds = <HTMLElement>this.element.querySelector('.knob-wrapper');
	}

	/**
	 * @public
	 * @method getactiveIndex
	 */
	public get activeIndex():KnockoutObservable<number>
	{
		return this.viewModel.activeIndex;
	}

	/**
	 * @public
	 * @method openIndex
	 */
	public openIndex(index: number): void
	{
		const progress = index / this._stepCount;

		TweenLite.to(
			this._knob, 1, {
				x: this._gridSize * (this._stepCount * progress),
				ease: Linear.easeNone,
				onUpdate: () =>
				{
					this._draggableInstance.update();

					this.handleDrag();
				}
			}
		)
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		super.allComponentsLoaded();

		this._gridSize = (this._bounds.offsetWidth - this._knob.offsetWidth) / this._stepCount;

		this._draggableInstance = Draggable.create(this._knob, {
			type: 'x',
			cursor: 'ew-resize',
			bounds: this._bounds,
			throwProps: true,
			overshootTolerance: 0,
			maxDuration: 0.5,
			minDuration: 0.5,
			throwResistance: 5000,
			onDrag: this.handleDrag.bind(this),
			onDragEnd: this.handleDrag.bind(this),
			onThrowUpdate: this.handleDrag.bind(this),
			onThrowComplete: this.handleDrag.bind(this),
			allowNativeTouchScrolling: (bowser.mobile || bowser.tablet) ? true : false,
			snap: {
				x: (endPos: number) =>
				{
					return (Math.round(endPos / this._gridSize) * this._gridSize);
				}
			}
		})[0];
	}

	/**
	 * @private
	 * @method handleDrag
	 */
	private handleDrag(): void
	{
		let progress = this._draggableInstance.x / this._draggableInstance.maxX;
		let visualProgress = this._draggableInstance.x / (this._draggableInstance.maxX + this._knob.offsetWidth);

		this.viewModel.progress(visualProgress);
		this.viewModel.activeIndex(Math.round(progress * this._stepCount));

		this.dispatch(CommonEvent.UPDATE, {
			progress: progress
		})
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._draggableInstance)
		{
			this._draggableInstance.kill();
			this._draggableInstance = null;
		}

		// always call this last
		super.destruct();
	}
}

export default MapSliderController;
