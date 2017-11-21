import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import PersonaSelectorData from './PersonaSelectorData';
import PersonaSelectorSlide from './PersonaSelectorSlide/PersonaSelectorSlide';
import PersonaSelectorTransitionController from './PersonaSelectorTransitionController';
import PersonaSelectorOptions from './PersonaSelectorOptions/PersonaSelectorOptions';
import PersonaSelectorMobileCarousel from './PersonaSelectorMobileCarousel/PersonaSelectorMobileCarousel';

export default {
	name: 'PersonaSelector',
	extends: AbstractBlockComponent,
	components: {
		PersonaSelectorSlide,
		PersonaSelectorOptions,
		PersonaSelectorMobileCarousel,
	},
	beforeCreate() {
		this.slides = {};
	},
	data() {
		return {
			activeIndex: 0,
			deviceState: this.$deviceState.currentState,
			enableInteraction: true,
		};
	},
	props: {
		data: VueTypes.shape(PersonaSelectorData).isRequired,
	},
	computed: {
		isSmall() {
			return this.deviceState <= this.DeviceState.SMALL;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PersonaSelectorTransitionController(this);
			this.deviceStateListener = new NativeEventListener(
				this.$deviceState,
				DeviceStateEvent.STATE_UPDATE,
				event => {
					this.deviceState = event.data.state;
				},
			);
			this.isReady();
		},
		handleSlideReady(component, index) {
			this.slides[index] = component;
		},
		handleMobilePaginatorClick(index) {
			this.getChild('PersonaSelectorMobileCarousel').openIndex(index);
		},
		handleMobileCarouselChange(index) {
			const mobileCarousel = this.getChild('PersonaSelectorMobileCarousel');
			const mobilePagination = this.getChild('DashedPaginator');
			// Temporary disable interaction
			mobileCarousel.disableInteraction();
			mobilePagination.disableInteraction();
			// Open the persona
			this.openPersona(index).then(() => {
				mobileCarousel.enableInteraction();
				mobilePagination.enableInteraction();
			});
		},
		openPersona(index) {
			this.$tracking.trackEvent({
				[this.TrackingProvider.GOOGLE_ANALYTICS]: {
					category: 'personaSelector',
					action: 'click',
					label: this.data.personas[index].heading,
					value: index + 1,
				},
			});

			const oldPersona = this.slides[this.activeIndex];
			const newPersona = this.slides[index];

			this.enableInteraction = false;
			this.activeIndex = index;

			if (oldPersona) {
				oldPersona.transitionController.transitionInTimeline.timeScale(2);
			}

			newPersona.transitionController.transitionInTimeline.timeScale(1);

			return oldPersona
				.transitionOut()
				.then(() => newPersona.transitionIn())
				.then(() => {
					this.enableInteraction = true;
				});
		},
	},
};
