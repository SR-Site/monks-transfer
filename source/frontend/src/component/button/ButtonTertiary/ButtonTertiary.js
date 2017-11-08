import { AbstractButtonComponent } from 'vue-block-system';
import ButtonTertiaryTransitionController from './ButtonTertiaryTransitionController';
import Size from 'data/enum/Size';
import Theme from 'data/enum/Theme';
import VueTypes from 'vue-types';

export default {
	name: 'ButtonTertiary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
		size: VueTypes.number.def(Size.LARGE),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTertiaryTransitionController(this);
			this.isReady();
		},
	},
};
