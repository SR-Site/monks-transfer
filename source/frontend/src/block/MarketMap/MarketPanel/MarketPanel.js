import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import Scrollbar from '../../../util/ScrollBar';
import MarketBlockPercentages from './block/MarketBlockPercentages';
import MarketComparePercentages from './block/MarketComparePercentages';
import MarketImage from './block/MarketImage';
import MarketImages from './block/MarketImages';
import MarketMediaKit from './block/MarketMediaKit';
import MarketNumbers from './block/MarketNumbers';
import MarketPercentages from './block/MarketPercentages';
import MarketVideo from './block/MarketVideo';
import MarketSources from './block/MarketSources';
import MarketPanelTransitionController from './MarketPanelTransitionController';

export default {
	name: 'MarketPanel',
	extends: AbstractTransitionComponent,
	components: {
		MarketVideo,
		MarketNumbers,
		MarketImages,
		MarketMediaKit,
		MarketImage,
		MarketPercentages,
		MarketComparePercentages,
		MarketBlockPercentages,
		MarketSources
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
	watch: {
		marketBlocks() {
			// Maybe add the update asynccomponents callback instead of this
			setTimeout(() => this.scrollbar.update(), 1000);
		},
	},
	computed: {
		marketLabel() {
			return this.market ? `${this.market.city}, ${this.market.statePostalCode}` : '';
		},
		marketBlocks() {
			return this.marketData && this.marketData[this.activeTab] ? this.marketData[this.activeTab].blocks : [];
		},
		marketId() {
			return this.market ? this.market.marketId : null;
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
		openPanel() {
			// Re-initialize the panel because the state might have changed
			this.transitionController.setupTransitionInTimeline();
			this.transitionIn();
		},
		handleClose() {
			this.transitionOut().then(() => this.$emit('closePanel'));
		},
		handleTabChange(index) {
			this.activeTab = index;
		},
	},
};
