import VueTypes from 'vue-types';
import WaveSurfer from 'wavesurfer';
import { AbstractTransitionComponent } from 'vue-transition-component';
import AudioPlayerTransitionController from './AudioPlayerTransitionController';
import AudioElement from '../../lib/media/enum/AudioElement';
import MediaElement from '../../lib/media/MediaElement';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'AudioPlayer',
	extends: AbstractTransitionComponent,
	props: {
		file: VueTypes.string.isRequired,
	},
	data() {
		return {
			isPlaying: false,
			progress: 0,
			hasWebAudioSupport:
			(window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext) !== undefined,
		};
	},
	beforeCreate() {},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudioPlayerTransitionController(this);
			this.isReady();

			if (this.hasWebAudioSupport) {
				this.createWaveSurfer();
			} else {
				this.createFallbackPlayer();
			}
		},
		handleClick() {
			if (this.hasWebAudioSupport) {
				this.waveSurfer.playPause();
				this.isPlaying = this.waveSurfer.isPlaying();
			} else {
				if (this.isPlaying) {
					this.fallbackPlayer.pause();
					this.isPlaying = false;
				} else {
					this.fallbackPlayer.play();
					this.isPlaying = true;
				}
			}

			// Tracking
			if (this.isPlaying) {
				// category: string;
				// action: string;
				// label?: string;
				// value?: number;
				this.$tracking.trackEvent(
					{
						[this.TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'audioFragment',
							action: 'click',
							label: `play|${this.data.title}`,
						},
					},
				);
			} else {
				const currentTime = this.hasWebAudioSupport ? this.waveSurfer.getCurrentTime() : this.fallbackPlayer.currentTime;
				const duration = this.hasWebAudioSupport ? this.waveSurfer.getDuration() : this.fallbackPlayer.duration;

				this.$tracking.trackEvent(
					{
						[this.TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'audioFragment',
							action: 'click',
							label: `pause|${this.data.title}`,
							value: Math.round(currentTime / duration * 100),
						},
					},
				);
			}
		},
		createWaveSurfer() {
			const height = this.getChild('ButtonCirclePlay').$el.offsetHeight;

			this.waveSurfer = WaveSurfer.create({
													height,
													container: this.$refs.waveForm,
													waveColor: '#003057',
													progressColor: '#009bdb',
													barWidth: 1,
													cursorWidth: 0,
													interact: false,
													normalize: true,
												});

			this.waveSurfer.load(this.file);
		},
		createFallbackPlayer() {
			this.fallbackPlayer = new AudioElement();
			this.fallbackPlayer.setSrc(this.options.file);

			this.fallbackPlayerEventListener = new NativeEventListener(
				this.fallbackPlayer,
				MediaElement.EVENT_TIMEUPDATE,
				() => {
					this.progress(this.fallbackPlayer.currentTime / this.fallbackPlayer.duration);
				},
			);
		},
	},
	beforeDestroy() {
		this.fallbackPlayer = null;

		if (this.fallbackPlayerEventListener) {
			this.fallbackPlayerEventListener.dispose();
			this.fallbackPlayerEventListener = null;
		}

		if (this.wavesurfer) {
			this.wavesurfer.destroy();
			this.wavesurfer = null;
		}
	},
};
