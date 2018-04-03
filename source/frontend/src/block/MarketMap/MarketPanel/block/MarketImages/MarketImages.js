import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import PropImage from '../../../../../data/prop-type/media/PropImage';
import MarketImagesTransitionController from './MarketImagesTransitionController';

export default {
	name: 'MarketImages',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			heading: VueTypes.string,
			subHeading: VueTypes.string,
			images: VueTypes.arrayOf(VueTypes.shape(PropImage).isRequired).isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketImagesTransitionController(this);
			this.isReady();
		},
	},
};
