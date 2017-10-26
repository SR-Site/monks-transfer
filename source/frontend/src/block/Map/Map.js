import VueTypes from 'vue-types';
import { TransitionEvent } from 'vue-transition-component';
import { AbstractBlockComponent } from 'vue-block-system';
import MapTransitionController from './MapTransitionController';
import MapData from './MapData';
import ImageSequence from '../../component/ImageSequence/ImageSequence';
import SlideText from './slide/SlideText/SlideText';
import NativeEventListener from '../../util/event/NativeEventListener';
import MapPaginator from '../../component/MapPaginator/MapPaginator';

export default {
	name: 'Map',
	extends: AbstractBlockComponent,
	components: {
		SlideText,
		ImageSequence,
		MapPaginator,
	},
	props: {
		data: VueTypes.shape(MapData).isRequired,
	},
	created() {
		this.slides = {};
	},
	data() {
		return {
			transitionInProgress: false,
			activeIndex: 0,
			hardcodedSequenceBackground: null,
			hardcodedImageSequence: {
				image: {
					normal: `${this.$versionRoot}data/sequence/map/desktop/map_lines_`,
					small: `${this.$versionRoot}data/sequence/map/mobile/map_lines_mobile_`,
					alt: 'Alt text',
				},
				total: 75,
				extension: '.png',
			},
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapTransitionController(this);
			let transitionInEventListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_COMPLETE,
				() => {
					transitionInEventListener.dispose();
					transitionInEventListener = null;
					console.log(this.slides[this.activeIndex]);
					this.slides[this.activeIndex].transitionIn();
				},
			);
			this.imageSequence = this.getChild('ImageSequence');
			this.paginator = this.getChild('MapPaginator');
			this.isReady();
		},
		handleSlideReady(component, index) {
			this.slides[index] = component;
		},
		handlePaginatorClick(index) {
			console.log('click on paginator');
			this.paginator.disableInteraction();
			this.openSlide(index).then(() => this.paginator.enableInteraction());
		},
		transitionIn(forceTransition) {
			return this.allComponentsReady
			.then(() => this.imageSequence.setup())
			.then(() => this.transitionController.transitionIn(forceTransition));
		},
		progressToFrameNumber(progress) {
			return Math.round((this.data.imageSequence.total - 1) * progress);
		},
		openSlide(index) {
			this.transitionInProgress = true;
			const stepCount = this.data.steps.length - 1;
			const currentProgress = this.activeIndex / stepCount;
			const targetProgress = index / stepCount;

			this.$tracking.trackEvent(
				{
					[this.TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'map',
						action: 'click',
						label: this.data.steps[index].heading,
						value: index,
					},
				},
			);

			return this.slides[this.activeIndex].transitionOut()
			.then(this.imageSequence.play(
				{
					loop: false,
					startFrame: this.progressToFrameNumber(currentProgress),
					endFrame: this.progressToFrameNumber(targetProgress),
				},
			))
			.then(() => this.slides[index].transitionIn())
			.then(() => {
				this.activeIndex = index;
				this.transitionInProgress = false;
			});
		},
	},
};
