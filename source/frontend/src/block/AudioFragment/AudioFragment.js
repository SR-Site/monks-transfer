import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudioFragmentTransitionController from './AudioFragmentTransitionController';
import AudioFragmentData from './AudioFragmentData';

export default {
	name: 'AudioFragment',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(AudioFragmentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new AudioFragmentTransitionController(this);
			this.isReady();
		},
	},
};
