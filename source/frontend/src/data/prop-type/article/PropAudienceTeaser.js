import VueTypes from 'vue-types';
import PropImage from '../media/PropImage';
import PropVideo from '../media/PropVideo';

export default {
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string,
	reaches: VueTypes.array,
	target: VueTypes.string,
	image: VueTypes.shape(PropImage).isRequired,
	imageStyle: VueTypes.string.isRequired,
};
