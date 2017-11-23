import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import GlossaryItemData from './GlossaryItemData';
import GlossaryItemTransitionController from './GlossaryItemTransitionController';

export default {
	name: 'GlossaryItem',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(GlossaryItemData).isRequired,
	},
	data() {
		return {
			unlocked: false,
		};
	},
	watch: {
		unlocked(value) {
			if (value) {
				this.transitionController.unlock();
			}
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryItemTransitionController(this);
			this.isReady();
		},
		unlock() {
			this.unlocked = true;
		},
	},
};
