import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import HeroTertiaryTransitionController from './HeroTertiaryTransitionController';
import HeroTertiaryData from './HeroTertiaryData';

export default {
	name: 'HeroTertiary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HeroTertiaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroTertiaryTransitionController(this);
			this.isReady();
		},
	},
};
