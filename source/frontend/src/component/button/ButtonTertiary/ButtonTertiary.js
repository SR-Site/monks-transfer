import Size from 'data/enum/Size';
import Theme from 'data/enum/Theme';
import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonTertiaryTransitionController from './ButtonTertiaryTransitionController';

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
