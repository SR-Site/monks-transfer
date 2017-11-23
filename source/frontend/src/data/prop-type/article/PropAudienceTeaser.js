import VueTypes from 'vue-types';
import PropImage from '../media/PropImage';
import PropVideo from '../media/PropVideo';

export default {
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	reaches: VueTypes.array.isRequired,
	target: VueTypes.string.isRequired,
};
