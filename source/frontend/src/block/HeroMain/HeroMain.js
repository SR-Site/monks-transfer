import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import { TransitionEvent } from 'vue-transition-component';
import bowser from 'bowser';
import ImageHelper from 'util/media/ImageHelper';
import HeroMainTransitionController from './HeroMainTransitionController';
import HeroMainData from './HeroMainData';
import PrimaryTriangle from '../../component/triangle/PrimaryTriangle/PrimaryTriangle';
import SecondaryTriangle from '../../component/triangle/SecondaryTriangle/SecondaryTriangle';
import TertiaryTriangle from '../../component/triangle/TertiaryTriangle/TertiaryTriangle';
import HeroMainSlide from './HeroMainSlide/HeroMainSlide';
import MediaCrossFader from '../../component/MediaCrossFader/MediaCrossFader';
import VideoType from '../../data/enum/VideoType';
import VideoElement from '../../lib/media/VideoElement';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'HeroMain',
	extends: AbstractBlockComponent,
	components: {
		PrimaryTriangle,
		SecondaryTriangle,
		TertiaryTriangle,
		HeroMainSlide,
		MediaCrossFader,
	},
	data() {
		return {
			activeIndex: 0,
			switchComplete: false,
		};
	},
	computed: {
		hasStatistics() {
			return this.data.slides.map(slide => slide.statistics !== null).indexOf(true) > -1;
		},
	},
	props: {
		data: VueTypes.shape(HeroMainData).isRequired,
	},
	beforeCreate() {
		this._slides = {};

		if (!bowser.ios && !bowser.android) {
			this._activeVideoElement; // eslint-disable-line
			this._videoElements = [new VideoElement(), new VideoElement()];

			this._videoElements.forEach(videoElement => {
				videoElement.setWidth(1280);
				videoElement.setHeight(720);
				videoElement.setVolume(0);
				videoElement.setLoop(true);
				videoElement.setAutoplay(true);
			});
		}
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroMainTransitionController(this);
			const transitionInCompleteListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_COMPLETE,
				() => {
					// Mark as done
					this.switchComplete = true;
					// Remove the listener
					transitionInCompleteListener.dispose();
				},
			);

			if (this.hasStatistics) {
				this.getChild('MediaCrossFader').setOverlay('rgba(0,48,87,0.5)');
			}

			this.isReady();
		},
		handleSlideReady(component, index) {
			this._slides[index] = component;
		},
		handleNextClick() {
			if (this.switchComplete) {
				this.switchComplete = false;
				const newIndex = this.activeIndex + 1 < this.data.slides.length ? this.activeIndex + 1 : 0;
				this.openNextStep(newIndex).then(() => {
					this.switchComplete = true;
				});
			}
		},
		openNextStep(index) {
			this.changeBackgroundImage(index);

			const oldSlide = this._slides[this.activeIndex];
			const newSlide = this._slides[index];

			const primaryTriangle = this.getChild('PrimaryTriangle');

			oldSlide.transitionController.transitionInTimeline.timeScale(2);
			newSlide.transitionController.transitionInTimeline.timeScale(1);

			return Promise.all([primaryTriangle.transitionOut(), oldSlide.transitionOut()])
				.then(() => Promise.all([primaryTriangle.transitionIn(), newSlide.transitionIn()]))
				.then(() => {
					this.activeIndex = index;
				});
		},
		changeBackgroundImage(index) {
			const crossFader = this.getChild('MediaCrossFader');
			if (crossFader) {
				// Videos have to be hosted on the same domain otherwise we cannot render them on canvas.
				if (
					this.data.slides[index].backgroundVideo &&
					this.data.slides[index].backgroundVideo.type === VideoType.INTERNAL &&
					(!bowser.android && !bowser.ios)
				) {
					// Get an available video element.
					const videoElement = this.getVideoElement();

					// Update the source to start playing the new backgroundVideo
					videoElement.setSrc(this.data.slides[index].backgroundVideo.url);

					// Open the new video
					return crossFader.openVideo(videoElement.element).then(() => {
						// Push the old active video element back into the re-usable array
						if (this._activeVideoElement) {
							// Push the active on back into the video elements array
							this._videoElements.push(this._activeVideoElement);
						}

						// Set the new active video element
						this._activeVideoElement = videoElement;
					});
				}
				return crossFader.openImage(ImageHelper.getImageForMediaQuery(this.data.slides[index].background));
			}
			return Promise.resolve();
		},
	},
};
