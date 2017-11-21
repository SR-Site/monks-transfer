import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { mapGetters } from 'vuex';
import SiteMenuPage from './SiteMenuPage/SiteMenuPage';
import SiteMenuTransitionController from './SiteMenuTransitionController';

export default {
	name: 'SiteMenu',
	extends: AbstractTransitionComponent,
	data() {
		return {
			history: [],
			active: 'root',
			pages: [],
		};
	},
	props: {
		menuActive: VueTypes.bool.isRequired,
	},
	watch: {
		menuActive(value) {
			if (value) {
				this.transitionIn();
			} else {
				this.transitionOut().then(() => {
					this.active = 'root';
					this.history = [];
				});
			}
		},
	},
	components: {
		SiteMenuPage,
	},
	computed: {
		...mapGetters({
			navigationData: 'initData/navigationData',
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SiteMenuTransitionController(this);
			this.parsePage({
				section: 'root',
				links: this.navigationData,
			});
			this.isReady();
		},
		parsePage(data) {
			this.pages.push(data);
			// Restart the loop
			data.links.forEach(page => {
				if (page.section) {
					this.parsePage(page);
				}
			});
		},
		handleBack() {
			this.active = this.history.pop();
		},
		transitionIn() {
			return this.allComponentsReady.then(() => {
				this.transitionController.transitionInTimeline.timeScale(1);
				this.transitionController.transitionIn();
			});
		},
		transitionOut() {
			this.transitionController.transitionInTimeline.timeScale(2.5);
			return this.transitionController.transitionOut(true);
		},
		handleSelectSection(section) {
			// Add the latest page to the history array
			this.history.push(this.active);
			// Activate the new section
			this.active = section;
		},
	},
};
