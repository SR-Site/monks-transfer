import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ShareTransitionController from './ShareTransitionController';
import ShareData from './ShareData';

export default {
	name: 'Share',
	extends: AbstractBlockComponent,
	data() {
		return {
			url: window.location.href,
		};
	},
	props: {
		data: VueTypes.shape(ShareData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ShareTransitionController(this);
			this.isReady();
		},
	},
};
