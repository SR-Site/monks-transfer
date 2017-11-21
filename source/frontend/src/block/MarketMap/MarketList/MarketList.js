import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import Scrollbar from '../../../util/ScrollBar';
import MarketListTransitionController from './MarketListTransitionController';

export default {
	name: 'MarketList',
	extends: AbstractTransitionComponent,
	props: {
		markets: VueTypes.any.isRequired,
		selectedMarket: VueTypes.any.isRequired,
		mobileSidePanelOpen: VueTypes.bool.isRequired,
	},
	watch: {
		mobileSidePanelOpen() {
			setTimeout(() => this.updateScrollBar(), 100);
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketListTransitionController(this);
			this.scrollBar = new Scrollbar(this.$refs.scrollWrapper);

			this.isReady();
		},
		updateScrollBar() {
			this.scrollBar.update();
		},
		handleSelectMarket(market) {
			this.$emit('selectMarket', market);
		},
	},
};
