import VueTypes from 'vue-types';
import PropStatistics from '../../../data/prop-type/hero-main/PropStatistics';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropVideo from '../../../data/prop-type/media/PropVideo';
import PropLink from '../../../data/prop-type/action/PropLink';

/**
 * @param {description} heading The heading on the slide
 * @param {description} paragraph The paragraph on the slide
 * @param {description} background normal: 1920x1080, small: 1280x720
 * @param {description} backgroundVideo The background video on the slide
 * @param {description} link The link for the slide
 * @param {description} statistics The statistics for the slide
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string,
	background: VueTypes.shape(PropImage),
	backgroundVideo: VueTypes.shape(PropVideo),
	link: VueTypes.shape(PropLink),
	statistics: VueTypes.shape(PropStatistics),
};
