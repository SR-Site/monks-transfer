import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import AudienceStatisticTeaserData from './AudienceStatisticTeaserData';
import AudienceStatisticTeaserTransitionController from './AudienceStatisticTeaserTransitionController';

export default {
	name: 'AudienceStatisticTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(AudienceStatisticTeaserData).isRequired,
	},
	data() {
		return {
			isHover: false,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudienceStatisticTeaserTransitionController(this);
			this.isReady();
		},
		handleMouseEnter() {
			this.isHover = true;
		},
		handleMouseLeave() {
			this.isHover = false;
		},
	},
};
