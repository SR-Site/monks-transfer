import { AbstractTransitionComponent } from 'vue-transition-component';
import MediaCrossFaderTransitionController from './MediaCrossFaderTransitionController';
import CrossFader from './util/CrossFader';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'MediaCrossFader',
	extends: AbstractTransitionComponent,
	mounted() {
		this.crossFader = new CrossFader(this.$el, this.$refs.canvas, this.$refs.gridSize);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MediaCrossFaderTransitionController(this);
			this.isReady();
		},
		setOverlay(overlayColor) {
			this.crossFader.setOverlay(overlayColor);
		},
		openImage(path, duration, ease) {
			return this.crossFader.openImage(path, duration, ease);
		},
		openVideo(path, duration, ease) {
			return this.crossFader.openVideo(path, duration, ease);
		},
	},
};
