import shuffle from 'lodash/shuffle';
import ContentService from 'net/service/ContentService';
import { AbstractBlockComponent, BlockHelper } from 'vue-block-system';
import VueTypes from 'vue-types';
import FilterContentData from './FilterContentData';
import FilterContentMenu from './FilterContentMenu/FilterContentMenu';
import FilterContentTransitionController from './FilterContentTransitionController';

export default {
	name: 'FilterContent',
	extends: AbstractBlockComponent,
	components: {
		FilterContentMenu,
	},
	data() {
		return {
			blocks: {},
			pageCache: {},
			index: 0,
			limit: 6,
			offset: 0,
			totalPages: 0,
			filters: {},
		};
	},
	computed: {
		paginatorItems() {
			return new Array(this.totalPages);
		},
	},
	props: {
		data: VueTypes.shape(FilterContentData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new FilterContentTransitionController(this);
			this.spinner = this.getChild('Spinner');
			this.loadPage(0);
			this.isReady();
		},
		handleFilterBlockReady(component) {
			component.transitionIn();
		},
		handlePaginatorClick(index) {
			this.loadPage(index);
		},
		handleFilterMenuUpdate(filters) {
			this.filters = filters;
			this.loadPage(0);
		},
		getFilters() {
			const filters = JSON.parse(JSON.stringify(this.filters));
			const result = {};

			// Strip out the empty results
			Object.keys(filters).forEach(key => {
				if (filters[key].length > 0) {
					result[key] = filters[key];
				}
			});

			// Return the object
			return {
				f: Object.keys(result).map(key => `${key}:${result[key]}`),
			};
		},
		loadPage(index) {
			this.$tracking.trackEvent({
				[this.TrackingProvider.GOOGLE_ANALYTICS]: {
					category: 'filterContent',
					action: 'click',
					label: 'loadMore',
					value: index,
				},
			});

			this.spinner.transitionIn();
			// Set the new offset
			this.offset = index * this.limit;
			// Update the active Index
			this.index = index;
			// Fetch the page from the backend
			ContentService.loadPage(this.data.endpoint, this.offset, this.limit, this.getFilters())
				.then(result => {
					// Empty the current block list
					this.blocks = [];
					this.$nextTick(() => {
						// Set the total page count
						this.totalPages = Math.ceil(result.pagination.total / this.limit);
						// Store the parsed blocks
						this.blocks = BlockHelper.parseBlocks({}, shuffle(result.data.blocks));
						// Trigger a resize on the parent block so they scroll tracker points get updated
						this.$nextTick(() => this.getParentPage().handleResize());
					});
				})
				.then(() => this.spinner.transitionOut());
		},
	},
};
