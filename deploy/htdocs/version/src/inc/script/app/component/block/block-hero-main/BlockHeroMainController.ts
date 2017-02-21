import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockHeroMainTransitionController from "app/component/block/block-hero-main/BlockHeroMainTransitionController";
import IBlockHeroMainOptions from "app/component/block/block-hero-main/IBlockHeroMainOptions";
import BlockHeroMainViewModel from "app/component/block/block-hero-main/BlockHeroMainViewModel";
import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import VideoElement from "../../../../lib/temple/util/VideoElement";
import Promise = require("bluebird");
import bowser = require("bowser");
import VideoType from "../../../data/enum/type/VideoType";

class BlockHeroMainController extends AbstractBlockComponentController<BlockHeroMainViewModel, IBlockHeroMainOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHeroMain');

	private _imageCrossfader: ImageCrossfaderController;

	private _videoElements: Array<VideoElement> = [new VideoElement(), new VideoElement()];
	private _activeVideoElement: VideoElement;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.viewModel.hasStatistics(this.options.slides.map((slide) => slide.statistics !== null).indexOf(true) > -1);

		// Setup the video elements
		if(!bowser.ios && !bowser.android)
		{
			this.setupVideoElements();
		}
	}

	/**
	 * @public
	 * @method changeBackgroundImage
	 * @param index
	 */
	public changeBackgroundImage(index: number): Promise<any>
	{
		if(this._imageCrossfader)
		{
			// Videos have to be hosted on the same domain otherwise we cannot render them on canvas.
			if(
				this.options.slides[index].backgroundVideo &&
				this.options.slides[index].backgroundVideo.type === VideoType.INTERNAL &&
				(!bowser.android && !bowser.ios))
			{
				// Get an available video element.
				let videoElement = this.getVideoElement();

				// Update the source to start playing the new backgroundVideo
				videoElement.setSrc(this.options.slides[index].backgroundVideo.url);

				// Open the new video
				return this._imageCrossfader.openVideo(videoElement.element)
					.then(() =>
					{
						// Push the old active video element back into the re-usable array
						if(this._activeVideoElement)
						{
							// Push the active on back into the video elements array
							this._videoElements.push(this._activeVideoElement);
						}

						// Set the new active video element
						this._activeVideoElement = videoElement;
					})
			}
			else
			{
				return this._imageCrossfader.openImage(
					ImageHelper.getImageForMediaQuery(
						this.options.slides[index].background
					)
				);
			}
		}
		else
		{
			return Promise.resolve();
		}
	}

	/**
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;

		if(this.viewModel.hasStatistics())
		{
			this._imageCrossfader.setOverlay('rgba(0,48,87,0.5)')
		}
	}

	/**
	 * @public
	 * @method get activeIndex
	 * @returns {any|any<number>}
	 */
	public get activeIndex(): number
	{
		return this.viewModel.activeIndex();
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHeroMainTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method getVideoElement
	 * @returns VideoElement
	 */
	private getVideoElement(): VideoElement
	{
		return this._videoElements.shift();
	}

	/**
	 * @private
	 * @method createVideoElements
	 */
	private setupVideoElements(): void
	{
		this._videoElements.forEach((videoElement: VideoElement) =>
		{
			videoElement.setWidth(1280);
			videoElement.setHeight(720);
			videoElement.setVolume(0);
			videoElement.setLoop(true);
			videoElement.setAutoplay(true);
		});
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._videoElements)
		{
			this._videoElements.length = 0;
			this._videoElements = null;
		}

		// always call this last
		super.destruct();
	}
}

export default BlockHeroMainController;
