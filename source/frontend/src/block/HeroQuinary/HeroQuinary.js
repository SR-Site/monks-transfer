import VueTypes from 'vue-types';
import bowser from 'bowser';
import ImageHelper from 'util/media/ImageHelper';
import { AbstractBlockComponent } from 'vue-block-system';
import HeroQuinaryTransitionController from './HeroQuinaryTransitionController';
import HeroQuinaryData from './HeroQuinaryData';
import PrimaryTriangle from '../../component/triangle/PrimaryTriangle/PrimaryTriangle';
import MediaCrossFader from '../../component/MediaCrossFader/MediaCrossFader';
import VideoElement from '../../lib/media/VideoElement';

export default {
	name: 'HeroQuinary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HeroQuinaryData).isRequired,
	},
	components: {
		MediaCrossFader,
		PrimaryTriangle,
	},
	created() {
		this.canPlayVideo = !bowser.ios && !bowser.android;
		this.hasVideo = this.data.backgroundVideo && this.data.backgroundVideo.type === VideoType.INTERNAL;

		if (this.canPlayVideo) {
			this.videoElement = new VideoElement();
			this.videoElement.setWidth(1280);
			this.videoElement.setHeight(720);
			this.videoElement.setVolume(0);
			this.videoElement.setLoop(true);
			this.videoElement.setAutoplay(true);
		}
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroQuinaryTransitionController(this);
			this.isReady();
		},
		setCrossFaderBackground() {
			const crossFader = this.getChild('MediaCrossFader');

			if (crossFader) {
				// Enable the blue overlay
				crossFader.setOverlay('rgba(2,87,142,0.75)');

				if (this.canPlayVideo && this.hasVideo) {
					// Update the source
					this.videoElement.setSrc(this.data.backgroundVideo.url);
					// Update the cross fader
					return crossFader.openVideo(this.videoElement.element);
				}

				return crossFader.openImage(ImageHelper.getImageForMediaQuery(this.data.background));
			}

			return Promise.resolve();
		},
	},
};
