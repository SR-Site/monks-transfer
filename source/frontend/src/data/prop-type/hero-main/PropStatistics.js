import VueTypes from 'vue-types';
import PropStatistic from './PropStatistic';

/**
 * @param {description} heading The heading of the statistics
 * @param {description} stats The statistics for the statistic
 */
export default {
	heading: VueTypes.string.isRequired,
	stats: VueTypes.arrayOf(VueTypes.shape(PropStatistic)),
};
