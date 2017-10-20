import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MapSecondaryTransitionController from './MapSecondaryTransitionController';
import MapSecondaryData from './MapSecondaryData';

export default {
	name: 'MapSecondary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MapSecondaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapSecondaryTransitionController(this);
			this.isReady();
		},
	},
};
