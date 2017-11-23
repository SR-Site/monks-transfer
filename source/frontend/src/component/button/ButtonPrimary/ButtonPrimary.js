import { AbstractButtonComponent, ButtonType } from 'vue-block-system';
import VueTypes from 'vue-types';
import stripe from './elementProps/stripe';
import label from './elementProps/label';
import svg from './elementProps/svg';
import backgroundStroke from './elementProps/backgroundStroke';
import hoverStroke from './elementProps/hoverStroke';
import base from './elementProps/base';
import ButtonPrimaryTransitionController from './ButtonPrimaryTransitionController';

export default {
	name: 'ButtonPrimary',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.number.isRequired,
		solid: VueTypes.bool.def(false),
	},
	render(createElement) {
		const tag = this.type === ButtonType.LINK ? 'a' : 'button';
		const tagProps = this.type === ButtonType.LINK ? { domProps: { href: this.link.target } } : {};

		return createElement(tag, Object.assign(base(this), tagProps), [
			createElement('span', stripe(this)),
			createElement('svg', svg(this), [
				createElement('rect', backgroundStroke(this)),
				createElement('rect', hoverStroke(this)),
			]),
			createElement('span', label(this)),
		]);
	},
	data() {
		return {
			width: 0,
			height: 0,
			borderWidth: 5,
		};
	},
	computed: {
		fullPath() {
			return this.width * 2 + this.height * 2;
		},
	},
	mounted() {
		this.setSize();
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonPrimaryTransitionController(this);
			this.isReady();
		},
		handleMouseEnter() {
			this.transitionController.onMouseEnter();
		},
		handleMouseLeave() {
			this.transitionController.onMouseLeave();
		},
		setSize() {
			if (this.$el.offsetWidth > 0 && this.$el.offsetHeight > 0) {
				this.$refs.hoverStroke.style.strokeWidth = `${this.borderWidth}px`;

				this.width = this.$el.offsetWidth;
				this.height = this.$el.offsetHeight;

				this.$refs.hoverStroke.setAttribute('width', `${this.width}px`);
				this.$refs.hoverStroke.setAttribute('height', `${this.height}px`);

				this.$refs.backgroundStroke.setAttribute('width', `${this.width}px`);
				this.$refs.backgroundStroke.setAttribute('height', `${this.height}px`);

				// Calculate the dash array value's
				this.$refs.hoverStroke.style.strokeDasharray = `0px ${this.fullPath}px`;
				this.$refs.hoverStroke.style.strokeDashoffset = `${this.height / 2}px`;
			}
		},
	},
};
