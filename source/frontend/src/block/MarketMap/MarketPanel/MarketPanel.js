import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import Scrollbar from '../../../util/ScrollBar';
import MarketNumbers from './block/MarketNumbers';
import MarketVideo from './block/MarketVideo';
import MarketPanelTransitionController from './MarketPanelTransitionController';

export default {
	name: 'MarketPanel',
	extends: AbstractTransitionComponent,
	components: {
		MarketVideo,
		MarketNumbers,
	},
	data() {
		return {
			activeTab: 0,
		};
	},
	props: {
		market: VueTypes.shape({
			city: VueTypes.string.isRequired,
			statePostalCode: VueTypes.string.isRequired,
			marketId: VueTypes.string.isRequired,
		}),
		marketData: VueTypes.arrayOf(
			VueTypes.shape({
				label: VueTypes.string.isRequired,
				blocks: VueTypes.arrayOf(
					VueTypes.shape({
						name: VueTypes.string.isRequired,
						data: VueTypes.object.isRequired,
					}),
				).isRequired,
			}),
		),
	},
	computed: {
		marketLabel() {
			return this.market ? `${this.market.city}, ${this.market.statePostalCode}` : '';
		},
		marketBlocks() {
			return this.marketData && this.marketData[this.activeTab] ? this.marketData[this.activeTab].blocks : [];
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketPanelTransitionController(this);
			this.scrollbar = new Scrollbar(this.$refs.scrollWrapper, {
				setContentSize: false,
			});
			this.isReady();
		},
		handleClose() {
			this.transitionOut().then(() => this.$emit('closePanel'));
		},
		handleTabChange(index) {
			this.activeTab = index;
		},
	},
};
