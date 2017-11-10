import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropLink from '../../../data/prop-type/action/PropLink';


export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink)
}
