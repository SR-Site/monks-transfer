import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MapTransitionController from './MapTransitionController';
import MapData from './MapData';

export default {
	name: 'Map',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(MapData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapTransitionController(this);
			this.isReady();
		},
	},
};
