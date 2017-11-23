import bowser from 'bowser';
import { TweenLite } from 'gsap';
import Draggable from 'gsap/Draggable';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import VideoPlayerControlsTransitionController from './VideoPlayerControlsTransitionController';

export default {
	name: 'VideoPlayerControls',
	extends: AbstractTransitionComponent,
	props: {
		isMuted: VueTypes.bool.isRequired,
		isPlaying: VueTypes.bool.isRequired,
		progress: VueTypes.number.isRequired,
	},
	data() {
		return {
			isActive: false,
			internalProgress: 0,
			displayMuteButton: !bowser.android && !bowser.ios,
		};
	},
	watch: {
		progress(value) {
			this.internalProgress = value;
			TweenLite.set(this.$refs.knob, {
				x: this.$refs.bounds.offsetWidth * value,
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoPlayerControlsTransitionController(this);
			this.isReady();
			this.createDraggableInstance();
		},
		handlePlayClick() {
			this.$emit('setPlay', !this.isPlaying);
		},
		handleMuteClick() {
			this.$emit('setMute', !this.isMuted);
		},
		setActiveState(isActive) {
			this.isActive = isActive;
		},
		createDraggableInstance() {
			[this.draggableInstance] = Draggable.create(this.$refs.knob, {
				type: 'x',
				allowNativeTouchScrolling: false,
				bounds: this.$refs.bounds,
				onDragStart: this.handleDragStart,
				onDrag: this.handleDrag,
				onDragEnd: this.handleDragEnd,
			});
		},
		handleDragStart() {
			this.$emit('setPlay', false);
		},
		handleDrag() {
			this.internalProgress = this.getProgress();
		},
		handleDragEnd() {
			this.$emit('seek', {
				progress: this.internalProgress,
			});
		},
		getProgress() {
			return this.draggableInstance.x / this.draggableInstance.maxX;
		},
	},
	beforeDestroy() {
		this.draggableInstance.destroy();
		this.draggableInstance = null;
	},
};
