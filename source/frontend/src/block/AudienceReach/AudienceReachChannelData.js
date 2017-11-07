import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import AudienceReachStatistic from './AudienceReachStatistic';

export default {
	image: VueTypes.shape(PropImage).isRequired,
	heading: VueTypes.string.isRequired,
	statistics: VueTypes.arrayOf(
		VueTypes.shape(AudienceReachStatistic)
	)
}
