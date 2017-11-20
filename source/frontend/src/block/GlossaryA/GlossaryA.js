import VueTypes from 'vue-types';
import ScrollTracker, { ScrollTrackerEvent } from 'seng-scroll-tracker';
import { TransitionEvent } from 'vue-transition-component';
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
			this.transitionInCompleteListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_START,
				this.createScrollTrackerPoints,
			);
			this.isReady();
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
		handleComponentEnterView(component) {
			console.log('component enters the view');
			component.unlock();
		},
		createScrollTrackerPoints() {
			if (this.transitionInCompleteListener) {
				this.transitionInCompleteListener.dispose();
				this.transitionInCompleteListener = null;
			}

			Object.keys(this.glossaryItems).forEach(key => {
				const component = this.glossaryItems[key];
				const element = component.$el;
				const point = this.scrollTracker.addPoint(this.getYPosition(element), element.offsetHeight);

				point.addEventListener(ScrollTrackerEvent.ENTER_VIEW, () => this.handleComponentEnterView(component));
				point.addEventListener(
					ScrollTrackerEvent.SCROLLED_BEYOND,
					() => this.handleComponentEnterView(component),
				);

				// Check for the position on init
				if (point.isInBounds) {
					this.handleComponentEnterView(component);
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
