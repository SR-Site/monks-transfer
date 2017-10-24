import { DeviceStateEvent } from 'seng-device-state-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import NativeEventListener from '../../util/event/NativeEventListener';
import PersonaSelectorData from './PersonaSelectorData';
import PersonaSelectorSlide from './PersonaSelectorSlide/PersonaSelectorSlide';
import PersonaSelectorTransitionController from './PersonaSelectorTransitionController';
import PersonaSelectorOptions from './PersonaSelectorOptions/PersonaSelectorOptions';

export default {
	name: 'PersonaSelector',
	extends: AbstractBlockComponent,
	components: {
		PersonaSelectorSlide,
		PersonaSelectorOptions,
	},
	beforeCreate() {
		this._slides = {};
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
				(event) => {
					this.deviceState = event.data.state;
				},
			);
			this.isReady();
		},
		handleSlideReady(component, index) {
			console.log('slide ready');
			this._slides[index] = component;
		},
		openPersona(index) {
			const oldPersona = this._slides[this.activeIndex];
			const newPersona = this._slides[index];

			this.enableInteraction = false;
			this.activeIndex = index;

			oldPersona.transitionController.transitionInTimeline.timeScale(2);
			newPersona.transitionController.transitionInTimeline.timeScale(1);

			return oldPersona.transitionOut()
			.then(() => newPersona.transitionIn())
			.then(() => {
				this.enableInteraction = true;
			});
		},
	},
};
