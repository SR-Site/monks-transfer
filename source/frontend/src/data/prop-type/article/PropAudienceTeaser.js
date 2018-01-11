import VueTypes from 'vue-types';
import PropImage from '../media/PropImage';
import PropVideo from '../media/PropVideo';

export default {
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string,
	reaches: VueTypes.array,
	target: VueTypes.string,
};
