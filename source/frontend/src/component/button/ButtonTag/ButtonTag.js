import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonTagTransitionController from './ButtonTagTransitionController';
import base from './elementProps/base';
import label from './elementProps/label';

export default {
	name: 'ButtonTag',
	extends: AbstractButtonComponent,
	props: {
		isInactive: VueTypes.string,
	},
	render(createElement) {
		const tag = this.type === this.ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === this.ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [createElement('span', label(this))]);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTagTransitionController(this);
			this.isReady();
		},
	},
};
