import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import DownloadFileATransitionController from './DownloadFileATransitionController';
import DownloadFileAData from './DownloadFileAData';

export default {
	name: 'DownloadFileA',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(DownloadFileAData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new DownloadFileATransitionController(this);
			this.isReady();
		},
	},
};
