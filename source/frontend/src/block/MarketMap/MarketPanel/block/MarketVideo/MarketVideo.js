import VueTypes from 'vue-types';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VideoPlayer from '../../../../../component/VideoPlayer';
import VideoType from '../../../../../data/enum/VideoType';
import PropVideo from '../../../../../data/prop-type/media/PropVideo';
import MarketVideoTransitionController from './MarketVideoTransitionController';

export default {
	name: 'MarketVideo',
	extends: AbstractTransitionComponent,
	components: {
		VideoPlayer,
	},
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			video: VueTypes.shape(PropVideo).isRequired,
		})
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketVideoTransitionController(this);
			this.$nextTick(() => {
				this.videoPlayer = this.getChild('VideoPlayer');
				this.videoPlayer.initVideo({
					video: this.data.video,
					loop: false,
					controls: this.data.video.type === VideoType.INTERNAL,
				});
			});
			this.isReady();
		},
	},
};
