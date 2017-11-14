import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropVideo from '../../../data/prop-type/media/PropVideo';

export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
};
