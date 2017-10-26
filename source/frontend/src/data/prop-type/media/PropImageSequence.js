import VueTypes from 'vue-types';
import PropImage from './PropImage';

export default {
	image: VueTypes.shape(PropImage).isRequired,
	total: VueTypes.number.isRequired,
	extension: VueTypes.string.isRequired,
	autoPlay: VueTypes.bool,
};
