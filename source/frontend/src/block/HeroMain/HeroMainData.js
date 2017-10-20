import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';
import PropLink from '../../data/prop-type/action/PropLink';
import AbstractBlockComponentData from '../../data/prop-type/AbstractBlockComponentData';
import PropStatistic from '../../data/prop-type/hero-main/PropStatistic';

export default Object.assign(AbstractBlockComponentData, {
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
});
