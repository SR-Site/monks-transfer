import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import MapSecondaryTransitionController from './MapSecondaryTransitionController';
import MapSecondaryData from './MapSecondaryData';
import ImageSequence from '../../component/ImageSequence/ImageSequence';

export default {
	name: 'MapSecondary',
	extends: AbstractBlockComponent,
	components: {
		ImageSequence,
	},
	props: {
		data: VueTypes.shape(MapSecondaryData).isRequired,
	},
	data() {
		return {
			sequenceProgress: 0,
			hardcodedSequenceBackground: null,
			hardcodedImageSequence: {
				image: {
					normal: `${this.$versionRoot}data/sequence/map-secondary/desktop/map_lines_`,
					small: `${this.$versionRoot}data/sequence/map-secondary/mobile/map_lines_mobile_`,
					alt: 'Image sequence',
				},
				total: 75,
				extension: '.png',
			},
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MapSecondaryTransitionController(this);
			this.imageSequence = this.getChild('ImageSequence');
			this.isReady();
		},
		handleImageSequenceUpdate(event) {
			this.sequenceProgress = event.progress;
		},
		handleImageSequenceLoaded() {
			this.imageSequence.play({
				loop: true,
				loopDelay: 2000,
			});
		},
	},
};
