import VueTypes from 'vue-types';
import ScrollTracker, { ScrollTrackerEvent } from 'seng-scroll-tracker';
import { AbstractBlockComponent } from 'vue-block-system';
import GlossaryATransitionController from './GlossaryATransitionController';
import GlossaryAData from './GlossaryAData';
import GlossaryItem from './GlossaryItem/';
import NativeEventListener from '../../util/event/NativeEventListener';

export default {
	name: 'GlossaryA',
	extends: AbstractBlockComponent,
	components: {
		GlossaryItem,
	},
	props: {
		data: VueTypes.shape(GlossaryAData).isRequired,
	},
	created() {
		this.scrollTracker = new ScrollTracker();
		this.glossaryItems = {};
		this.scrollTrackerPoints = {};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new GlossaryATransitionController(this);
			this.resizeListener = new NativeEventListener(window, 'resize', this.handleResize);
			this.isReady();
			this.$nextTick(() => this.createScrollTrackerPoints());
		},
		handleGlossaryReady(component) {
			this.glossaryItems[component.componentId] = component;
		},
		handleResize() {
			Object.keys(this.scrollTrackerPoints).forEach(key => {
				const point = this.scrollTrackerPoints[key];
				const component = this.glossaryItems[key];

				point.position = this.getYPosition(component.$el);
				point.height = component.$el.offsetHeight;
			});
		},
		createScrollTrackerPoints() {
			Object.keys(this.glossaryItems).forEach(key => {
				const component = this.glossaryItems[key];
				const element = component.$el;
				const point = this.scrollTracker.addPoint(this.getYPosition(element), element.offsetHeight);

				point.addEventListener(ScrollTrackerEvent.ENTER_VIEW, () => component.unlock());
				point.addEventListener(ScrollTrackerEvent.SCROLLED_BEYOND, () => component.unlock());

				// Check for the position on init
				if (point.isInBounds) {
					component.unlock();
				}

				this.scrollTrackerPoints[component.componentId] = point;
			});
		},
		getYPosition(element) {
			const offset = window.innerHeight * 0.25;
			const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
			return elementPosition + offset;
		},
	},
	beforeDestroy() {
		this.scrollTracker.dispose();
		this.scrollTracker = null;
	},
};
