import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import AudioFragmentTransitionController from './AudioFragmentTransitionController';
import AudioFragmentData from './AudioFragmentData';
import AudioPlayer from '../../component/AudioPlayer/AudioPlayer';

export default {
	name: 'AudioFragment',
	extends: AbstractBlockComponent,
	components: {
		AudioPlayer,
	},
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
