import bowser from 'bowser';
import ImageHelper from 'util/media/ImageHelper';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import MediaCrossFader from '../../component/MediaCrossFader/MediaCrossFader';
import PrimaryTriangle from '../../component/triangle/PrimaryTriangle/PrimaryTriangle';
import VideoElement from '../../lib/media/VideoElement';
import HeroQuaternaryData from './HeroQuaternaryData';
import HeroQuaternaryTransitionController from './HeroQuaternaryTransitionController';
import VideoType from '../../data/enum/VideoType';

export default {
	name: 'HeroQuaternary',
	extends: AbstractBlockComponent,
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
	props: {
		data: VueTypes.shape(HeroQuaternaryData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroQuaternaryTransitionController(this);
			this.isReady();
		},
		setCrossFaderBackground() {
			const crossFader = this.getChild('MediaCrossFader');

			if (crossFader) {
				// Enable the blue overlay
				if (this.data.overlay) {
					crossFader.setOverlay('rgba(2,87,142,0.75)');
				}

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
