import Size from 'data/enum/Size';
import Theme from 'data/enum/Theme';
import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonTertiaryTransitionController from './ButtonTertiaryTransitionController';
import base from './elementProps/base';
import label from './elementProps/label';

export default {
	name: 'ButtonTertiary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
		size: VueTypes.number.def(Size.LARGE),
	},
	render(createElement) {
		const tag = this.type === this.ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === this.ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [createElement('span', label(this))]);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTertiaryTransitionController(this);
			this.isReady();
		},
	},
};
