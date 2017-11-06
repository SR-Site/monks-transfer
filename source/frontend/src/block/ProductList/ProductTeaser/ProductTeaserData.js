import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';

export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
};
