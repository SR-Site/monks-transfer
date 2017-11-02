import VueTypes from 'vue-types';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	quote: VueTypes.string.isRequired,
	author: VueTypes.string.isRequired,
	position: VueTypes.string.isRequired,
};
