import { Expo, TweenLite } from 'gsap';
import debounce from 'lodash/debounce';
import padStart from 'lodash/padStart';
import { AbstractBlockComponent } from 'vue-block-system';
import { TransitionEvent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import ImageCallToActionsData from './ImageCallToActionsData';
import ImageCallToActionsTransitionController from './ImageCallToActionsTransitionController';

export default {
	name: 'ImageCallToActions',
	extends: AbstractBlockComponent,
	data() {
		return {
			transitionInComplete: false,
			hoverScale: 1.1,
			activeImage: null,
			hoverSizes: [],
			triangleSize: 0,
		};
	},
	props: {
		data: VueTypes.shape(ImageCallToActionsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.resizeHandler = new NativeEventListener(window, 'resize', debounce(this.handleResize, 100));
			this.calculateSizes();
			this.handleResize();
			this.transitionController = new ImageCallToActionsTransitionController(this);
			const transitionInCompleteListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_COMPLETE,
				() => {
					transitionInCompleteListener.dispose();
					this.transitionInComplete = true;
				},
			);
			this.isReady();
		},
		handleResize() {
			this.triangleSize = 1 / this.data.callToActions.length * document.body.offsetWidth;

			if (this.$deviceState.currentState > this.DeviceState.SMALL) {
				this.clipImages(0);
			}
		},
		handleMouseEnter(index) {
			if (this.transitionInComplete) {
				this.activeImage = index;
				this.clipImages(1);
			}
		},
		handleMouseLeave() {
			if (this.transitionInComplete) {
				this.activeImage = null;
				this.clipImages(1);
			}
		},
		getPaginationNumber(index) {
			return padStart(index.toString(), 2, '0');
		},
		calculateSizes() {
			const { callToActions } = this.data;
			const size = 1 / callToActions.length;
			const growSize = size * this.hoverScale;
			const otherSize = (1 - growSize) / (callToActions.length - 1);

			// Dynamically calculate the sizes based on the amount of options
			callToActions.forEach((callToAction, rowIndex) => {
				this.hoverSizes[rowIndex] = [];

				callToActions.forEach((action, index) => {
					this.hoverSizes[rowIndex].push(index === rowIndex ? growSize : otherSize);
				});
			});
		},
		clipImages(duration) {
			let left = 0;
			const height = this.$el.offsetHeight;
			let width = this.$el.offsetWidth / this.data.callToActions.length;

			this.$refs.image.forEach((image, index) => {
				if (this.activeImage !== null) {
					width = this.$el.offsetWidth * this.hoverSizes[this.activeImage][index];
				}

				const right = left + width;

				TweenLite.to(image, duration, {
					clip: `rect(0px, ${right}px, ${height}px, ${left}px)`,
					ease: Expo.easeOut,
				});

				left += width;
			});
		},
	},
	beforeDestroy() {
		this.resizeHandler.dispose();
		this.resizeHandler = null;
	},
};
