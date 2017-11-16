import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import AudienceReachStatistic from './AudienceReachStatistic';

/**
 * @param {description} image normal: 240x240, small: 240x240
 * @param {description} heading The heading for the channel data
 * @param {description} statistics The statistics
 */
export default {
	image: VueTypes.shape(PropImage).isRequired,
	heading: VueTypes.string.isRequired,
	statistics: VueTypes.arrayOf(
		VueTypes.shape(AudienceReachStatistic)
	)
}
