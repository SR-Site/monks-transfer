import { AbstractButtonComponent } from 'vue-block-system';
import Alignment from 'data/enum/Alignment';
import Theme from 'data/enum/Theme';
import VueTypes from 'vue-types';
import ButtonCircleIconTransitionController from './ButtonCircleIconTransitionController';
import base from './elementProps/base';
import label from './elementProps/label';
import icon from './elementProps/icon';

export default {
	name: 'ButtonCircleIcon',
	extends: AbstractButtonComponent,
	props: {
		icon: VueTypes.string.isRequired,
		iconPosition: VueTypes.oneOf([Alignment.LEFT, Alignment.RIGHT]),
		theme: VueTypes.oneOf([Theme.LIGHT, Theme.DARK]).def(Theme.LIGHT),
	},
	render(createElement) {
		const tag = this.type === this.ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === this.ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [
			this.label ? createElement('span', label(this)) : null,
			createElement('Icon', icon(this)),
		]);
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleIconTransitionController(this);
			this.isReady();
		},
	},
};
