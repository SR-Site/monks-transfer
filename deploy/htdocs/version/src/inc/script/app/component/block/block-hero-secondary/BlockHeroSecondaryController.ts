import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockHeroSecondaryTransitionController from "app/component/block/block-hero-secondary/BlockHeroSecondaryTransitionController";
import IBlockHeroSecondaryOptions from "app/component/block/block-hero-secondary/IBlockHeroSecondaryOptions";
import BlockHeroSecondaryViewModel from "app/component/block/block-hero-secondary/BlockHeroSecondaryViewModel";
import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import ImageHelper from "../../../util/ImageHelper";
import VideoElement from "../../../../lib/temple/util/VideoElement";
import VideoType from "../../../data/enum/type/VideoType";
import bowser = require("bowser");

class BlockHeroSecondaryController extends AbstractBlockComponentController<BlockHeroSecondaryViewModel, IBlockHeroSecondaryOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHeroSecondary');

	private _imageCrossfader: ImageCrossfaderController;
	private _videoElement: VideoElement = new VideoElement();

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		if(this.canPlayVideo() && this.hasVideo())
		{
			this._videoElement.setWidth(1280);
			this._videoElement.setHeight(720);
			this._videoElement.setVolume(0);
			this._videoElement.setLoop(true);
			this._videoElement.setAutoplay(true);
		}

		this._debug.log('Init');
	}

	/**
	 * @private
	 * @method canPlayVideo
	 * @returns {boolean}
	 */
	private canPlayVideo(): boolean
	{
		return (!bowser.android && !bowser.ios)
	}

	/**
	 * @private
	 * @method hasVideo
	 * @returns {IVideo|boolean}
	 */
	private hasVideo(): boolean
	{
		return (
			this.options.backgroundVideo &&
			this.options.backgroundVideo.type === VideoType.INTERNAL
		);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHeroSecondaryTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @public
	 * @method changeBackgroundImage
	 */
	public changeBackgroundImage(): void
	{
		if(this._imageCrossfader)
		{
			if(this.canPlayVideo() && this.hasVideo())
			{
				this._videoElement.setSrc(this.options.backgroundVideo.url);

				this._imageCrossfader.openVideo(this._videoElement.element)
			}
			else
			{
				// Open the first image
				this._imageCrossfader.openImage(
					ImageHelper.getImageForMediaQuery(this.options.background)
				)
			}
		}
	}

	/**
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._imageCrossfader = null;
		this._videoElement = null;

		// always call this last
		super.destruct();
	}
}

export default BlockHeroSecondaryController;
