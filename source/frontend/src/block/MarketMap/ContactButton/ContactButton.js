import { CustomButtonEvent, customButtonEventDispatcher } from 'vue-block-system';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import BackendLinkType from '../../../data/enum/link/BackendLinkType';
import ContactButtonTransitionController from './ContactButtonTransitionController';

export default {
	name: 'ContactButton',
	extends: AbstractTransitionComponent,
	props: {
		label: VueTypes.string.isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ContactButtonTransitionController(this);
			this.isReady();
		},
		handleClick() {
			customButtonEventDispatcher.dispatchEvent(
				new CustomButtonEvent(CustomButtonEvent.FIRE, {
					event: BackendLinkType.CONTACT_US,
				}),
			);
		},
	},
};
