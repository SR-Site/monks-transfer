import { AbstractButtonComponent } from 'vue-block-system';
import Size from 'data/enum/Size';
import VueTypes from 'vue-types';
import ButtonCircleCloseTransitionController from './ButtonCircleCloseTransitionController';

export default {
	name: 'ButtonCircleClose',
	extends: AbstractButtonComponent,
	props: {
		size: VueTypes.number.def(Size.LARGE),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleCloseTransitionController(this);
			this.isReady();
		},
	},
};
