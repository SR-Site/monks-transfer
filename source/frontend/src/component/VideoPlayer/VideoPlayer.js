import { AbstractTransitionComponent } from 'vue-transition-component';
import debounce from 'lodash/debounce'
import VideoElement from 'lib/media/VideoElement';
import ElementResizer, { ScaleMode } from 'lib/temple/ElementResizer';
import Player from '@vimeo/player';
import VideoPlayerTransitionController from './VideoPlayerTransitionController';
import VideoPlayerControls from './VideoPlayerControls/VideoPlayerControls';
import VideoType from '../../data/enum/VideoType';
import NativeEventListener from '../../util/event/NativeEventListener';
import InternalVideoPlayer from '../../util/media/InternalVideoPlayer';

export default {
	name: 'VideoPlayer',
	extends: AbstractTransitionComponent,
	components: {
		VideoPlayerControls,
	},
	created() {
		this.videoPlayer = null;
	},
	data() {
		return {
			options: null,
			enableCustomControls: false,
			isMuted: false,
			isPlaying: false,
			progress: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoPlayerTransitionController(this);
			this.resizeListener = new NativeEventListener(
				window,
				'resize',
				debounce(this.handleResize, 250),
			);

			this.videoControls = this.getChild('VideoPlayerControls');
			this.isReady();
		},
		handleResize() {
			if (this.videoType === VideoType.INTERNAL && this.videoPlayer) {
				ElementResizer.resize(
					this.videoPlayer.element,
					16,
					9,
					ScaleMode.COVER,
				);
			}
		},
		handleMouseMove() {
			if (this.enableCustomControls && this.videoControls) {
				this.videoControls.setActiveState(true);
			}

			clearTimeout(this.mouseMoveTimeout);

			this.mouseMoveTimeout = setTimeout(() => {
				if (this.enableCustomControls && this.videoControls) {
					this.videoControls.setActiveState(false);
				}
			}, 2000);
		},
		handleSetMute(mute) {
			this.videoPlayer.setVolume(mute ? 0 : 1);
			this.isMuted = mute;
		},
		handleSetPlay(play) {
			if (play) {
				this.play();
			} else {
				this.pause();
			}
		},
		handleSeek(data) {
			this.videoPlayer.getDuration()
				.then(duration => this.videoPlayer.setCurrentTime(data.progress * duration))
				.then(() => this.play());
		},
		handleMouseLeave() {
			if (this.enableCustomControls && this.videoControls) {
				this.videoControls.setActiveState(false);
			}
		},
		handleVideoEnd() {
			this.$emit('end');
		},
		handleTimeUpdate() {
			this.$emit('timeupdate');
			this.updateProgress();
		},
		handleVideoPlayerReady() {
			this.handleResize();
		},
		initVideo(options) {
			this.options = options;
			switch (options.video.type) {
				case VideoType.INTERNAL:
					this.createInternalVideoPlayer();
					break;
				case VideoType.VIMEO:
					this.createVimeoVideoPlayer();
					break;
				default:
					throw new Error(`Unsupported video type, ${options.type}`);
			}

		},
		createInternalVideoPlayer() {
			this.enableCustomControls = true;
			this.videoControls.setActiveState(true);
			this.videoPlayer = new InternalVideoPlayer(
				this.$el,
				{
					url: this.options.video.url,
					poster: this.options.poster,
					loop: this.options.loop,
					controls: this.options.controls,
				},
			);

			this.videoPlayer.addEventListener(VideoElement.EVENT_ENDED, this.handleVideoEnd);
			this.videoPlayer.addEventListener(VideoElement.EVENT_TIMEUPDATE, this.handleTimeUpdate);

			this.handleVideoPlayerReady();
		},
		createVimeoVideoPlayer() {
			this.enableCustomControls = false;
			this.videoControls.setActiveState(false);
			const id = this.vimeoUrlToVimeoId(this.options.video.url);
			this.videoPlayer = new Player(
				this.$el,
				{
					id,
					width: 640,
					height: 480,
					loop: this.options.loop,
					title: false,
					byline: false,
					portrait: false,
				},
			);

			this.videoPlayer.loadVideo(id);
			this.videoPlayer.element.style.display = 'block';

			this.videoPlayer.on('ended', this.handleVideoEnd);
			this.videoPlayer.on('timeupdate', this.handleTimeUpdate);
			this.videoPlayer.ready().then(() => this.handleVideoPlayerReady());
		},
		isAbsoluteUrl(url) {
			return /^[\w-\.]*:/.test(url);
		},
		vimeoUrlToVimeoId(url) {
			if (this.isAbsoluteUrl(url)) {
				const match = url.match(/(videos|video|channels|\.com)\/([\d]+)/);
				return match.length ? match[2] : null;
			}
			else {
				return url;
			}
		},
		removePlayer() {
			if (this.videoPlayer) {
				this.pause()
				.then(() => {
					this.videoPlayer.unload();

					if (this.options.video.type === VideoType.VIMEO) {
						this.videoPlayer.off('ended');
						this.videoPlayer.off('timeupdate');

						// Do not remove the video player from the DOM because otherwise it has issues when creating a
						// new instance. There is no actual destroy method, see ticket
						// https://github.com/vimeo/player.js/issues/126
						this.videoPlayer.element.style.display = 'none';
						this.videoPlayer = null;

					} else {
						if (this.options.video.type === VideoType.INTERNAL) {
							this.videoPlayer.dispose();
							this.videoPlayer = null;
						}
					}
				});
			}
		},
		updateProgress() {
			let duration = 0;
			let currentTime = 0;
			Promise.all(
				[
					this.videoPlayer.getCurrentTime().then(value => currentTime = value),
					this.videoPlayer.getDuration().then(value => duration = value),
				],
			).then(() => {
				this.progress = currentTime / duration;
			});
		},
		play() {
			this.isPlaying = true;

			this.$tracking.trackEvent(
				{
					[this.TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'videoPlayer',
						action: 'click',
						label: `play|${this.options.title}`,
					},
				},
			);

			return this.videoPlayer.play();

		},
		pause() {
			this.isPlaying = false;
			return this.videoPlayer.pause()
			.then(() => Promise.all(
				[
					this.videoPlayer.getCurrentTime(),
					this.videoPlayer.getDuration(),
				],
			))
			.then((result) => {
				this.$tracking.trackEvent(
					{
						[this.TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'videoPlayer',
							action: 'click',
							label: 'pause',
							value: Math.round(result[0] / result[1] * 100),
						},
					},
				);
			});
		},
	},
	beforeDestroy() {
		this.removePlayer();

		if (this.resizeListener) {
			this.resizeListener.dispose();
			this.resizeListener = null;
		}

		clearTimeout(this.mouseMoveTimeout);
		this.mouseMoveTimeout = null;
	},
};
