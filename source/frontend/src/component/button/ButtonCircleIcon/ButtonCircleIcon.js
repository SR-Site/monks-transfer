import { AbstractButtonComponent } from 'vue-block-system';
import Alignment from 'data/enum/Alignment';
import VueTypes from 'vue-types';
import ButtonCircleIconTransitionController from './ButtonCircleIconTransitionController';

export default {
	name: 'ButtonCircleIcon',
	extends: AbstractButtonComponent,
	props: {
		icon: VueTypes.string.isRequired,
		iconPosition: VueTypes.oneOf([Alignment.LEFT, Alignment.RIGHT]),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleIconTransitionController(this);
			this.isReady();
		},
	},
};
