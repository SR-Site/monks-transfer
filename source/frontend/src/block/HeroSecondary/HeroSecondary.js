import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import HeroSecondaryTransitionController from './HeroSecondaryTransitionController';
import HeroSecondaryData from './HeroSecondaryData';

export default {
	name: 'HeroSecondary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HeroSecondaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroSecondaryTransitionController(this);
			this.isReady();
		},
	},
};
