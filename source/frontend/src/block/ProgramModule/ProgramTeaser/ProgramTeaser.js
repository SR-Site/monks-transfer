import { AbstractTransitionComponent } from 'vue-transition-component';
import ProgramTeaserTransitionController from './ProgramTeaserTransitionController';
import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropLink from '../../../data/prop-type/action/PropLink';
import PropVideo from '../../../data/prop-type/media/PropVideo';
import { VideoOverlayMutationTypes } from '../../../store/module/videoOverlay';
import { truncate } from 'lodash';

export default {
	name: 'ProgramTeaser',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(
			{
				target: VueTypes.string.isRequired,
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string.isRequired,
				stats: VueTypes.shape(
					{
						percentage: VueTypes.number.isRequired,
						demographic: VueTypes.string.isRequired,
					},
				),
				image: VueTypes.shape(PropImage).isRequired,
				video: VueTypes.shape(PropVideo),
				tags: VueTypes.arrayOf(
					VueTypes.shape(PropLink),
				),
			},
		),
	},
	computed: {
		truncatedParagraph() {
			return truncate(this.data.paragraph, {
				length: 150,
				separator: ' ',
			});
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProgramTeaserTransitionController(this);
			this.isReady();
		},
		handleVideoClick() {
			this.$store.dispatch(VideoOverlayMutationTypes.SHOW, {
				video: this.data.video,
				title: this.data.heading,
				poster: this.data.image,
			});
		},
	},
};
