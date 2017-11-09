import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import DownloadFileBTransitionController from './DownloadFileBTransitionController';
import DownloadFileBData from './DownloadFileBData';

export default {
	name: 'DownloadFileB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(DownloadFileBData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new DownloadFileBTransitionController(this);
			this.isReady();
		},
	},
};
