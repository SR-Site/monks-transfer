import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';
import PropLink from '../../data/prop-type/action/PropLink';
import PropStatistic from '../../data/prop-type/hero-main/PropStatistic';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	slides: VueTypes.arrayOf(
		VueTypes.shape(
			{
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string,
				background: VueTypes.shape(PropImage),
				backgroundVideo: VueTypes.shape(PropVideo),
				link: VueTypes.shape(PropLink),
				statistics: VueTypes.shape(PropStatistic),
			},
		),
	),
};
