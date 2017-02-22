import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import VideoControlsTransitionController from 'app/component/video-controls/VideoControlsTransitionController';
import IVideoControlsOptions from 'app/component/video-controls/IVideoControlsOptions';
import VideoControlsViewModel from 'app/component/video-controls/VideoControlsViewModel';

import Log from "lib/temple/util/Log";

class VideoControlsController extends AbstractTransitionComponentController<VideoControlsViewModel, IVideoControlsOptions, VideoControlsTransitionController>
{
	public static PLAY: string = 'VideoControlsController.PLAY';
	public static PAUSE: string = 'VideoControlsController.PAUSE';
	public static MUTE: string = 'VideoControlsController.MUTE';
	public static UNMUTE: string = 'VideoControlsController.UNMUTE';
	public static SEEK: string = 'VideoControlsController.SEEK';

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.VideoControls');

	private _knob: HTMLElement;
	private _bounds: HTMLElement;
	private _draggableInstance: Draggable;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method set isActive
	 * @description Show or hide the controls
	 * @param isActive
	 */
	public set isActive(isActive:boolean)
	{
		this.viewModel.isActive(isActive);
	}

	/**
	 * @public
	 * @method set isPlaying
	 * @description Toggle the play button status
	 * @param isPlaying
	 */
	public set isPlaying(isPlaying:boolean)
	{
		this.viewModel.isPlaying(isPlaying);
	}

	/**
	 * @public
	 * @method set progress
	 * @param progress
	 */
	public set progress(progress: number)
	{
		// Update the progress
		this.viewModel.progress(progress);

		// Update the knob position
		TweenLite.set(this._knob, {x: this._bounds.offsetWidth * progress});

		// Update the draggable
		this._draggableInstance.update();
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new VideoControlsTransitionController(this.element, this);

		this._knob = <HTMLElement>this.element.querySelector('.knob');
		this._bounds = <HTMLElement>this.element.querySelector('.progress-bar-wrapper');

		this.createDraggableInstance();

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method createDraggableInstance
	 */
	private createDraggableInstance(): void
	{
		this._draggableInstance = Draggable.create(this._knob, {
			type: 'x',
			allowNativeTouchScrolling: false,
			bounds: this._bounds,
			onDragStart: this.handleDragStart.bind(this),
			onDrag: this.handleDrag.bind(this),
			onDragEnd: this.handleDragEnd.bind(this)
		})[0]
	}

	/**
	 * @private
	 * @method handleDragStart
	 */
	private handleDragStart():void
	{
		this.viewModel.isPlaying(false);

		this.dispatch(VideoControlsController.PAUSE);
	}

	/**
	 * @private
	 * @method handleDragEnd
	 */
	private handleDragEnd(): void
	{
		const progress = this.getProgress();

		this.viewModel.progress(progress);

		this.viewModel.isPlaying(true);

		this.dispatch(VideoControlsController.SEEK, {progress: progress});
		this.dispatch(VideoControlsController.PLAY);
	}

	/**
	 * @private
	 * @method handleDrag
	 */
	private handleDrag(): void
	{
		this.viewModel.progress(this.getProgress());
	}

	/**
	 * @private
	 * @method getProgress
	 */
	private getProgress(): number
	{
		return this._draggableInstance.x / this._draggableInstance.maxX;
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

		this._bounds = null;
		this._knob = null;

		// always call this last
		super.destruct();
	}
}

export default VideoControlsController;
