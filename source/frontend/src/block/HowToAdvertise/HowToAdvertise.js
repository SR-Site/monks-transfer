import { TweenLite } from 'gsap';
import debounce from 'lodash/debounce'
import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import NativeEventListener from '../../util/event/NativeEventListener';
import HowToAdvertiseData from './HowToAdvertiseData';
import HowToAdvertiseTransitionController from './HowToAdvertiseTransitionController';

export default {
	name: 'HowToAdvertise',
	extends: AbstractBlockComponent,
	components: {
		ScrollBar,
	},
	props: {
		data: VueTypes.shape(HowToAdvertiseData).isRequired,
	},
	data() {
		return {
			deviceState: this.$deviceState.currentState,
		};
	},
	methods: {
		created() {
			this.openStepAnimationProgress = 0;
		},
		handleAllComponentsReady() {
			this.transitionController = new HowToAdvertiseTransitionController(this);
			this.transitionController.setupHowToAdvertiseTimeline();
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
				debounce(this.handleResize, 500),
			);
			this.scrollBar = this.getChild('ScrollBar');
			this.setScrollBarSnapPositions();
			this.isReady();
		},
		handleScrollBarUpdate(progress) {
			this.transitionController.seekHowToAdvertiseTimeline(progress);
		},
		handleOpenStep(index) {
			this.$tracking.trackEvent(
				{
					[this.TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'howToAdvertise',
						action: 'click',
						label: `open|${this.data.steps[index].heading}`,
						value: index + 1,
					},
				},
			);

			TweenLite.fromTo(
				this, 0.8,
				{
					openStepAnimationProgress: this.transitionController.getHowToAdvertiseProgress(),
				},
				{
					openStepAnimationProgress: index / (this.data.steps.length - 1),
					ease: Quad.easeInOut,
					onUpdate: () => {
						this.transitionController.seekHowToAdvertiseTimeline(this.openStepAnimationProgress);
						this.scrollBar.setProgress(this.openStepAnimationProgress);
					},
				},
			);
		},
		setScrollBarSnapPositions() {
			this.scrollBar.setSnapPosition(
				this.scrollBar.getMaxX() / (this.data.steps.length - 1),
			);
		},
		handleResize() {
			this.transitionController.updateHowToAdvertiseTimeline();

			this.setScrollBarSnapPositions();
			this.scrollBar.setProgress(0);
			this.handleOpenStep(0);
		},
	},
	beforeDestroy() {
		this.deviceStateListener.dispose();
		this.deviceStateListener = null;
		this.resizeListener.dispose();
		this.resizeListener = null;
	},
};
