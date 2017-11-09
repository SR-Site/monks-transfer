import bowser from 'bowser';
import ImageHelper from 'util/media/ImageHelper';
import { AbstractBlockComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import MediaCrossFader from '../../component/MediaCrossFader/MediaCrossFader';
import VideoType from '../../data/enum/VideoType';
import VideoElement from '../../lib/media/VideoElement';
import HeroTertiaryData from './HeroTertiaryData';
import HeroTertiaryTransitionController from './HeroTertiaryTransitionController';

export default {
	name: 'HeroTertiary',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(HeroTertiaryData).isRequired,
	},
	components: {
		MediaCrossFader,
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
			this.transitionController = new HeroTertiaryTransitionController(this);
			this.isReady();
		},
		setCrossFaderBackground() {
			const crossFader = this.getChild('MediaCrossFader');

			if (crossFader) {
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
