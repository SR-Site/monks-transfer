import PropImage from '../../../data/prop-type/media/PropImage';
import VueTypes from 'vue-types';
import PropVideo from '../../../data/prop-type/media/PropVideo';

export default {
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	reaches: VueTypes.array.isRequired,
};
