import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import PropImage from '../../../../../data/prop-type/media/PropImage';
import MarketImageTransitionController from './MarketImageTransitionController';

export default {
	name: 'MarketImage',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape({
			heading: VueTypes.string,
			image: VueTypes.shape(PropImage).isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketImageTransitionController(this);
			this.isReady();
		},
	},
};
