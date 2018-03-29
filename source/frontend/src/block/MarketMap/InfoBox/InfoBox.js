import VueTypes from 'vue-types';
import { AbstractTransitionComponent } from 'vue-transition-component';
import InfoBoxTransitionController from './InfoBoxTransitionController';

export default {
	name: 'InfoBox',
	extends: AbstractTransitionComponent,
	data() {
		return {
			isActive: false,
		};
	},
	props: {
		data: VueTypes.shape({
			heading: VueTypes.string.isRequired,
			copy: VueTypes.string.isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new InfoBoxTransitionController(this);
			this.isReady();
		},
		handleToggle() {
			this.isActive = !this.isActive;
		},
	},
};
