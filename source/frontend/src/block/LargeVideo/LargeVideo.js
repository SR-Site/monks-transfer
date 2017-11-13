import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import LargeVideoTransitionController from './LargeVideoTransitionController';
import LargeVideoData from './LargeVideoData';

export default {
	name: 'LargeVideo',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(LargeVideoData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new LargeVideoTransitionController(this);
			this.isReady();
		},
	},
};
