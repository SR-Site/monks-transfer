import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ImageListTransitionController from './ImageListTransitionController';
import ImageListData from './ImageListData';
import ImageListSlide from './ImageListSlide/ImageListSlide';
import { TweenLite, Expo } from 'gsap';
import normalizeWheel from 'normalize-wheel';
import NativeEventListener from '../../util/event/NativeEventListener';
import { debounce } from 'lodash';
import Hammer from 'hammerjs';

export default {
	name: 'ImageList',
	extends: AbstractBlockComponent,
	components: {
		ImageListSlide,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	props: {
		data: VueTypes.shape(ImageListData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ImageListTransitionController(this);
			this.scrolllistener = new NativeEventListener(document, 'scroll', this.handleScroll);
			this.mouseWheelListener = new NativeEventListener(this.$el, 'mousewheel', this.handleMouseWheel);
			this.resizeListener = new NativeEventListener(window, 'resize', debounce(this.handleResize, 100));
			this.hammer = new Hammer(this.$el, {
				recognizers: [
					[Hammer.Swipe, {
						direction: Hammer.DIRECTION_VERTICAL,
					}],
				],
			});
			this.hammer.on('swipeup', this.handleSwipeUp);
			this.hammer.on('swipedown', this.handleSwipeDown);

			// Disable swipe by default
			this.enableSwipe(false);

			this.isReady();
		},
		handleScroll() {
			if (this.isCentered()) {
				this.enableSwipe(true);
			}
		},
		handleSwipeUp() {
			if (
				this.$deviceState.currentState <= this.DeviceState.SMALL &&
				this.activeIndex + 1 < this.data.slides.length
			) {
				this.next();
			}
		},
		handleSwipeDown() {
			if (
				this.$deviceState.currentState <= this.DeviceState.SMALL &&
				this.activeIndex - 1 >= 0
			) {
				this.previous();
			}
		},
		handleMouseWheel(event) {
			const normalized = normalizeWheel(event);

			if (this.isCentered()) {
				if (normalized.pixelY > 1 && this.activeIndex + 1 < this.data.slides.length) {
					event.preventDefault();
					this.next(event);
				} else {
					if (normalized.pixelY < -1 && this.activeIndex - 1 >= 0) {
						event.preventDefault();
						this.previous(event);
					}
				}
			}
		},
		handleResize() {
			this.openSlide(this.activeIndex);
		},
		enableSwipe(enable) {
			this.hammer.get('swipe').set({ enable });
		},
		isCentered() {
			const offset = 100;
			const centerPoint = this.$el.offsetTop + (this.$el.offsetHeight / 2);
			const scrollCenter = window.pageYOffset + (window.innerHeight / 2);

			// Check if the element is within range
			return scrollCenter > centerPoint - offset && scrollCenter < centerPoint + 100;
		},
		next() {
			const next = this.activeIndex + 1;

			if (next <= this.data.slides.length) {
				this.openSlide(next);
			}
		},
		previous() {
			const previous = this.activeIndex - 1;

			if (previous >= 0) {
				this.openSlide(previous);
			}
		},
		openSlide(index) {
			if (!this.openSlidePromise) {
				this.openSlidePromise = new Promise((resolve) => {
					TweenLite.to(
						this.$refs.slides,
						0.8,
						{
							y: this.$el.offsetHeight * -index,
							ease: Expo.easeInOut,
							onComplete: () => {
								this.openSlidePromise = null;
								this.activeIndex = index;

								if (index === 0 || index === this.data.slides.length - 1) {
									this.enableSwipe(false);
								}

								resolve();
							},
						},
					);
				});
			}

			return this.openSlidePromise;
		},
	},
	beforeDestroy() {
		this.mouseWheelListener.dispose();
		this.mouseWheelListener = null;
		this.scrollListener.dispose();
		this.scrollListener = null;
		this.resizeListener.dispose();
		this.resizeListener = null;
	},
};
