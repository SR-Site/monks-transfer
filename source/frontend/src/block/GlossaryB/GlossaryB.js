import VueTypes from 'vue-types';
import keyCode from 'key-code';
import { AbstractBlockComponent } from 'vue-block-system';
import GlossaryBTransitionController from './GlossaryBTransitionController';
import GlossaryBData from './GlossaryBData';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'GlossaryB',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(GlossaryBData).isRequired,
	},
	data() {
		return {
			searchActive: false,
			query: '',
			itemsPerPage: 5,
			activePage: 1,
			activeCategory: this.data.landingCategory,
		};
	},
	computed: {
		categories() {
			const categories = {};

			this.data.items.forEach(item => {
				if (!categories[item.category]) {
					categories[item.category] = {
						label: item.category,
						value: item.category,
						items: [],
					};
				}

				categories[item.category].items.push(item);
			});

			return categories;
		},
		activeGlossaryItems() {
			// Select the correct category
			const category = this.categories[this.activeCategory] || {};
			const items = category.items || [];

			// Apply the filter query
			return items.filter(item => {
				const query = this.query.toLowerCase();
				const label = item.label.toLowerCase();
				const value = item.value.toLowerCase();

				return label.indexOf(query) > -1 || value.indexOf(query) > -1;
			});

		},
		paginatedGlossaryItems() {
			return this.activeGlossaryItems.slice(0, this.activePage * this.itemsPerPage);
		},
		showLoadMoreButton() {
			return this.activeGlossaryItems.length > this.activePage * this.itemsPerPage;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryBTransitionController(this);
			// Crete a listener for closing the popup with the escape key
			this.keyDownEventListener = new NativeEventListener(document, 'keyup', this.handleKeyUp.bind(this));
			this.isReady();
		},
		handleCategoryClick(category) {
			this.activePage = 1;
			this.activeCategory = category;
			this.notifyAboutResize();
		},
		handleShowMore() {
			this.activePage = this.activePage + 1;
			this.notifyAboutResize();
		},
		handleKeyUp(event) {
			if (event.keyCode === keyCode.ESC) {
				this.searchActive = false;
				this.query = '';
			}
		},
		handleQueryChange(event) {
			this.query = event.currentTarget.value;
			this.activePage = 1;
			this.notifyAboutResize();
		},
		handleToggleSearch() {
			this.searchActive = !this.searchActive;
		},
		handleSelectChange(event) {
			this.activeCategory = event.currentTarget.value;
			this.notifyAboutResize();
		},
		handleFormSubmit() {
			// Nothing?
			console.log('form submit triggered');
		},
		notifyAboutResize(){
			console.log('notify about resize');
			setTimeout(() => this.$emit('resize'), 1000);
		}
	},
};
