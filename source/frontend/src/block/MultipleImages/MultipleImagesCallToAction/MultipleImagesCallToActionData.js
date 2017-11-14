import VueTypes from 'vue-types';
import PropLink from '../../../data/prop-type/action/PropLink';

export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
};
