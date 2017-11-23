import VueTypes from 'vue-types';
import { AbstractButtonComponent } from 'vue-block-system';
import Theme from 'data/enum/Theme';
import ButtonSecondaryTransitionController from './ButtonSecondaryTransitionController';
import base from './elementProps/base';
import label from './elementProps/label';

export default {
	name: 'ButtonSecondary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
	},
	render(createElement) {
		const tag = this.type === this.ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === this.ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [createElement('span', label(this))]);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonSecondaryTransitionController(this);
			this.isReady();
		},
	},
};
