import { AbstractButtonComponent } from 'vue-block-system';
import Alignment from 'data/enum/Alignment';
import Theme from 'data/enum/Theme';
import VueTypes from 'vue-types';
import ButtonCircleIconTransitionController from './ButtonCircleIconTransitionController';

export default {
	name: 'ButtonCircleIcon',
	extends: AbstractButtonComponent,
	props: {
		icon: VueTypes.string.isRequired,
		iconPosition: VueTypes.oneOf([Alignment.LEFT, Alignment.RIGHT]),
		theme: VueTypes.oneOf([Theme.LIGHT, Theme.DARK]).def(Theme.LIGHT)
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleIconTransitionController(this);
			this.isReady();
		},
	},
};
