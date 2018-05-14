import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import PropImage from '../../../../../data/prop-type/media/PropImage';
import MarketTextTransitionController from './MarketTextTransitionController';

export default {
	name: 'MarketText',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			text: VueTypes.string.isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketTextTransitionController(this);
			this.isReady();
		},
	},
};
