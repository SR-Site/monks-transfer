import { AbstractButtonComponent } from 'vue-block-system';
import ButtonStartAdvertisingTransitionController from './ButtonStartAdvertisingTransitionController';
import NativeEventListener from '../../../util/event/NativeEventListener';
import debounce from 'lodash/debounce'
import { TweenLite, Expo } from 'gsap';

const CENTER_PERCENTAGE = 0.6;

export default {
	name: 'ButtonStartAdvertising',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonStartAdvertisingTransitionController(this);
			this.scrollListener = new NativeEventListener(
				window,
				'scroll',
				debounce(this.positionElement, 100),
			);
			this.positionElement();
			this.isReady();
		},
		positionElement() {
			const elementHeight = this.$el.offsetHeight;
			const screenCenter = window.innerHeight * CENTER_PERCENTAGE;
			const footerHeight = document.body.querySelector('.site-footer').offsetHeight;
			const maxScrollTop = document.body.offsetHeight - footerHeight - elementHeight;
			const scrollTop = document.documentElement.scrollTop;

			// Calculate the center position based on the scroll position and the page height
			let yPos = Math.min(maxScrollTop, Math.abs(scrollTop) + screenCenter - (elementHeight / 2));

			// If we are not able to scroll, this is going to happen when the sub-components are not yet loaded we want
			// to center it in the screen
			if (maxScrollTop <= 0) {
				yPos = screenCenter - (elementHeight / 2);
			}

			// Animate to the position
			TweenLite.to(
				this.$el,
				0.8,
				{
					y: yPos,
					ease: Expo.easeOut,
				},
			);

		},
	},
};
