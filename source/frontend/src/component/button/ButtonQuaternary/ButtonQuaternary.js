import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import Size from 'data/enum/Size';
import Theme from 'data/enum/Theme';
import ButtonQuaternaryTransitionController from './ButtonQuaternaryTransitionController';
import base from './elementProps/base';
import stripe from './elementProps/stripe';
import label from './elementProps/label';

export default {
	name: 'ButtonQuaternary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.def(Theme.DARK),
		size: VueTypes.number.def(Size.LARGE),
	},
	render(createElement) {
		const tag = this.type === this.ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === this.ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [
			createElement('span', stripe(this)),
			createElement('span', label(this)),
		]);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonQuaternaryTransitionController(this);
			this.isReady();
		},
	},
};
