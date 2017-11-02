import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import HeroQuaternaryTransitionController from './HeroQuaternaryTransitionController';
import HeroQuaternaryData from './HeroQuaternaryData';

export default {
	name: 'HeroQuaternary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HeroQuaternaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroQuaternaryTransitionController(this);
			this.isReady();
		},
	},
};
