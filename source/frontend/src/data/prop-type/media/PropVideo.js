import VueTypes from 'vue-types';
import VideoType from 'data/enum/VideoType';
export default {
	url: VueTypes.string.isRequired,
	type: VueTypes.oneOf([VideoType.INTERNAL, VideoType.VIMEO, VideoType.BRIGHTCOVE]).isRequired,
};
