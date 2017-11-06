import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import Size from 'data/enum/Size';
import Theme from 'data/enum/Theme';
import ButtonQuaternaryTransitionController from './ButtonQuaternaryTransitionController';

export default {
	name: 'ButtonQuaternary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
		size: VueTypes.number.def(Size.LARGE),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonQuaternaryTransitionController(this);
			this.isReady();
		},
	},
};
