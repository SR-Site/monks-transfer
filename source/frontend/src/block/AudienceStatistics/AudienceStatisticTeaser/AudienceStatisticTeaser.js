import { AbstractTransitionComponent } from 'vue-transition-component';
import AudienceStatisticTeaserTransitionController from './AudienceStatisticTeaserTransitionController';
import AudienceStatisticTeaserData from './AudienceStatisticTeaserData';
import VueTypes from 'vue-types';

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
