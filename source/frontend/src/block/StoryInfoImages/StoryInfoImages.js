import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import StoryInfoImagesTransitionController from './StoryInfoImagesTransitionController';
import StoryInfoImagesData from './StoryInfoImagesData';
import { padStart, truncate } from 'lodash';
import { DeviceState } from '../../config/deviceStateConfig';

export default {
	name: 'StoryInfoImages',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(StoryInfoImagesData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new StoryInfoImagesTransitionController(this);
			this.isReady();
		},
		handleMouseEnter(index) {
			if (this.$deviceState > DeviceState.SMALL) {
				this.$tracking.trackEvent(
					{
						[this.TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'storyInfoImage',
							action: 'click',
							label: `open|${this.data.stories[index].heading}`,
						},
					},
				);
				this.activeIndex = index;
			}
		},
		padStart(value) {
			return padStart(value.toString(), 2, '0');
		},
		truncate(value) {
			return truncate(value.toString(), {
				length: 150,
				separator: ' ',
			});
		},
	},
};
