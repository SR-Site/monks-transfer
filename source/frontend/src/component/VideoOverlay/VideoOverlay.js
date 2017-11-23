import keyCode from 'key-code';
import { mapState } from 'vuex';
import { AbstractTransitionComponent, TransitionEvent } from 'vue-transition-component';
import VideoOverlayTransitionController from './VideoOverlayTransitionController';
import NativeEventListener from '../../util/event/NativeEventListener';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

export default {
	name: 'VideoOverlay',
	extends: AbstractTransitionComponent,
	components: {
		VideoPlayer,
	},
	watch: {
		isActive(value) {
			if (value) {
				// Crete a listener for closing the popup with the escape key
				this.keyDownEventListener = new NativeEventListener(document, 'keyup', this.handleKeyUp.bind(this));
				this.transitionIn();
			}
		},
	},
	computed: {
		...mapState('videoOverlay', ['isActive', 'video', 'poster', 'title', 'loop', 'controls', 'resolve']),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new VideoOverlayTransitionController(this);
			this.transitionController.addEventListener(TransitionEvent.TRANSITION_IN_COMPLETE, () => {
				this.videoPlayer = this.getChild('VideoPlayer');
				this.videoPlayer.initVideo({
					video: this.video,
					poster: this.poster,
					loop: this.loop,
					controls: this.controls,
				});
				this.videoPlayer.play();
			});
			this.transitionController.addEventListener(TransitionEvent.TRANSITION_OUT_START, () => {
				this.keyDownEventListener.dispose();
				this.keyDownEventListener = null;
			});
			this.isReady();
		},
		close() {
			return this.transitionOut()
				.then(() => this.videoPlayer.removePlayer())
				.then(this.resolve.bind(this));
		},
		handleKeyUp(event) {
			if (this.isActive && event.keyCode === keyCode.ESC) {
				this.close();
			}
		},
	},
};
