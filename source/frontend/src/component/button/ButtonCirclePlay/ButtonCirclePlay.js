import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import Size from 'data/enum/Size';
import ButtonCirclePlayTransitionController from './ButtonCirclePlayTransitionController';

export default {
	name: 'ButtonCirclePlay',
	extends: AbstractButtonComponent,
	props: {
		isPlaying: VueTypes.bool.isRequired,
		size: VueTypes.number.def(Size.LARGE),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCirclePlayTransitionController(this);
			this.isReady();
		},
	},
};
