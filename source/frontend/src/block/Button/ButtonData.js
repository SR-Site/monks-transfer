import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	alignment: VueTypes.number.isRequired,
	link: VueTypes.shape(PropLink),
};
