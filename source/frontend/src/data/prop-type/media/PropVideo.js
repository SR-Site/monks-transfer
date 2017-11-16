import VueTypes from 'vue-types';
import VideoType from '../../enum/VideoType';

/**
 * @param {description} url The url to the video
 * @param {placeholder} url /path/to/video.mp4
 * @param {description} type The type of the video
 */
export default {
	url: VueTypes.string.isRequired,
	type: VueTypes.oneOf(
		[
			VideoType.INTERNAL,
			VideoType.VIMEO,
			VideoType.BRIGHTCOVE,
		],
	).isRequired,
};
