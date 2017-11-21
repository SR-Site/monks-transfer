import padStart from 'lodash/padStart';
import truncate from 'lodash/truncate';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import { DeviceState } from '../../config/deviceStateConfig';
import StoryInfoImagesData from './StoryInfoImagesData';
import StoryInfoImagesTransitionController from './StoryInfoImagesTransitionController';

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
			if (this.$deviceState.currentDeviceState.state > DeviceState.SMALL) {
				this.$tracking.trackEvent({
					[this.TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'storyInfoImage',
						action: 'click',
						label: `open|${this.data.stories[index].heading}`,
					},
				});
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
