import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	name: VueTypes.string.isRequired,
	description: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	file: VueTypes.string.isRequired,
};
