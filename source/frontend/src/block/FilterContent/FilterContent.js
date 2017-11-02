import VueTypes from 'vue-types';
import { AbstractBlockComponent, BlockHelper } from 'vue-block-system';
import FilterContentTransitionController from './FilterContentTransitionController';
import FilterContentData from './FilterContentData';
import FilterContentMenu from './FilterContentMenu/FilterContentMenu';
import ContentService from 'net/service/ContentService';
import { shuffle } from 'lodash';

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
			limit: 4,
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
			console.log(this.$refs.filterContentMenu.$el);
			console.log(this.$el);



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
			return JSON.parse(JSON.stringify(this.filters));
		},
		loadPage(index) {
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
