import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockHeroTertiaryTransitionController from 'app/component/block/block-hero-tertiary/BlockHeroTertiaryTransitionController';
import IBlockHeroTertiaryOptions from 'app/component/block/block-hero-tertiary/IBlockHeroTertiaryOptions';
import BlockHeroTertiaryViewModel from 'app/component/block/block-hero-tertiary/BlockHeroTertiaryViewModel';

import Log from "lib/temple/util/Log";
import ImageCrossfaderController from "../../image-crossfader/ImageCrossfaderController";
import VideoElement from "../../../../lib/temple/util/VideoElement";
import bowser = require("bowser");
import VideoType from "../../../data/enum/type/VideoType";
import ImageHelper from "../../../util/ImageHelper";

class BlockHeroTertiaryController extends AbstractBlockComponentController<BlockHeroTertiaryViewModel, IBlockHeroTertiaryOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockHeroTertiary');

	private _imageCrossfader: ImageCrossfaderController;
	private _videoElement: VideoElement;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		if(this.canPlayVideo() && this.hasVideo())
		{
			this._videoElement = new VideoElement();
			this._videoElement.setWidth(1280);
			this._videoElement.setHeight(720);
			this._videoElement.setVolume(0);
			this._videoElement.setLoop(true);
			this._videoElement.setAutoplay(true);
		}
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
	 * @public
	 * @method handleImageCrossfaderReady
	 */
	public handleImageCrossfaderReady(controller: ImageCrossfaderController): void
	{
		this._imageCrossfader = controller;
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockHeroTertiaryTransitionController(this.element, this);

		super.allComponentsLoaded();
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

export default BlockHeroTertiaryController;
