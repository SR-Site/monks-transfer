import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import MarketMediaKitTransitionController from './MarketMediaKitTransitionController';

export default {
	name: 'MarketMediaKit',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape({
			heading: VueTypes.string,
			label: VueTypes.string.isRequired,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketMediaKitTransitionController(this);
			this.getChild('ButtonQuaternary').transitionIn();
			this.isReady();
		},
		handleButtonClick() {
			console.log('clicked');
		},
	},
};
