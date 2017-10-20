import VueTypes from 'vue-types';
import AbstractBlockComponentData from '../../data/prop-type/AbstractBlockComponentData';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	heading: VueTypes.string.isRequired,
};
