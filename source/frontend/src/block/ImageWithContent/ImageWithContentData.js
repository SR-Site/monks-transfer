import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';

export default {
	alignment: VueTypes.number.isRequired,
	croppedImage: VueTypes.bool.isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink),
};
