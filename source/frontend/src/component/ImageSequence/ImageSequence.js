import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractTransitionComponent } from 'vue-transition-component';
import ImageSequenceTransitionController from './ImageSequenceTransitionController';
import { debounce, padStart } from 'lodash';
import NativeEventListener from '../../util/event/NativeEventListener';
import LoadImageTask from '../../util/preloading/task/LoadImageTask';
import { TweenLite, Linear } from 'gsap';
import VueTypes from 'vue-types';
import PropImageSequence from '../../data/prop-type/media/PropImageSequence';

const FPS = 24;

export default {
	name: 'ImageSequence',
	extends: AbstractTransitionComponent,
	props: {
		imageSequence: VueTypes.shape(PropImageSequence).isRequired,
		initializeManually: VueTypes.bool,
	},
	data() {
		return {
			stopped: true,
			currentFrame: 0,
			deviceState: this.$deviceState.currentState,
		};
	},
	computed: {
		validDeviceState() {
			return this.deviceState < this.DeviceState.MEDIUM ? this.DeviceState.SMALL : this.DeviceState.MEDIUM;
		},
	},
	watch: {
		validDeviceState(value) {
			this.stop();
			this.loadAllCurrentDeviceStateImages()
				.then(() => this.drawFrame(this.currentFrame))
				.then(() => this.$emit('loaded'));
		},
	},
	created() {
		this.playAnimation = null;
		this.sources = {
			[this.DeviceState.SMALL]: [],
			[this.DeviceState.MEDIUM]: [],
		};
		this.images = {
			[this.DeviceState.SMALL]: [],
			[this.DeviceState.MEDIUM]: [],
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageSequenceTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => {
					this.deviceState = event.data.state;
				},
			);
			this.resizeListener = new NativeEventListener(
				window,
				'resize',
				debounce(this.handleResize, 200),
			);
			this.ctx = this.$el.getContext('2d');
			this.prepareSources();
			if (!this.initializeManually) {
				this.setup();
			}
			this.isReady();
		},
		prepareSources() {
			for (let i = 0; i < this.imageSequence.total; i += 1) {
				this.sources[this.DeviceState.SMALL].push(
					this.imageSequence.image.small + padStart(i.toString(), 3, '0') + this.imageSequence.extension,
				);
				this.sources[this.DeviceState.MEDIUM].push(
					this.imageSequence.image.normal + padStart(i.toString(), 3, '0') + this.imageSequence.extension,
				);
			}
		},
		setup() {
			this.handleResize();
			return this.loadAllCurrentDeviceStateImages()
			.then(() => this.drawFrame(this.currentFrame))
			.then(() => this.$emit('loaded'));
		},
		handleResize() {
			this.$el.width = this.$el.parentNode.offsetWidth;
			this.$el.height = this.$el.parentNode.offsetHeight;

			// Redraw the last frame
			this.drawFrame(this.currentFrame);
		},
		play(options) {
			return new Promise(resolve => {
				this.stopped = false;
				const mergedOptions = Object.assign(
					{
						loop: false,
						loopDelay: 0,
						startFrame: 0,
						endFrame: this.imageSequence.total,
					},
					options,
				);

				const frameCounter = { frame: mergedOptions.startFrame };
				const totalDuration = Math.abs(mergedOptions.endFrame - mergedOptions.startFrame) / FPS;

				this.playAnimation = TweenLite.to(
					frameCounter,
					totalDuration,
					{
						frame: mergedOptions.endFrame - 1,
						ease: Linear.easeNone,
						onUpdate: () => this.drawFrame(Math.round(frameCounter.frame)),
						onComplete: () => {
							resolve();

							if (mergedOptions.loop && !this.stopped) {
								clearTimeout(this.loopTimeout);
								this.loopTimeout = setTimeout(() => this.play(mergedOptions), mergedOptions.loopDelay);
							}
						},
					},
				);
			});
		},
		stop() {
			this.stopped = true;
			clearTimeout(this.loopTimeout);

			if (this.playAnimation) {
				this.playAnimation.kill();
				this.playAnimation = null;
			}
		},
		drawFrame(frame) {
			const image = this.images[this.validDeviceState][frame];

			if (image) {
				this.ctx.clearRect(0, 0, this.$el.offsetWidth, this.$el.offsetHeight);
				this.ctx.drawImage(image, 0, 0, this.$el.offsetWidth, this.$el.offsetHeight);

				this.$emit('update', {
					progress: frame / (this.imageSequence.total - 1),
				});
			}
		},
		loadAllCurrentDeviceStateImages() {
			if (this.images[this.validDeviceState][0]) {
				return Promise.resolve();
			} else {
				// Create a new task for loading the assets
				const loadImageTask = new LoadImageTask(
					{
						assets: this.sources[this.validDeviceState],
						onAssetLoaded: result => {
							this.images[this.validDeviceState][result.index] = result.asset;
						},
					},
				);

				// Run the loader
				return loadImageTask.load().then(() => {
					loadImageTask.dispose();
				});
			}
		},
	},
	beforeDestroy() {
		this.ctx = null;
		this.playAnimation = null;
		this.images = null;
		this.sources = null;

		this.deviceStateListener.dispose();
		this.deviceStateListener = null;

		this.resizeListener.dispose();
		this.resizeListener = null;
	},
};
