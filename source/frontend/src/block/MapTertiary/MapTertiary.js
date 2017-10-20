import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MapTertiaryTransitionController from './MapTertiaryTransitionController';
import MapTertiaryData from './MapTertiaryData';

export default {
	name: 'MapTertiary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MapTertiaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapTertiaryTransitionController(this);
			this.isReady();
		},
	},
};
