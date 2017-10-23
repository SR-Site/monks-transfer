import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
	tags: VueTypes.arrayOf(PropLink),
	theme: VueTypes.number.isRequired,
	author: VueTypes.shape({
		name: VueTypes.string.isRequired,
		role: VueTypes.string.isRequired,
		image: VueTypes.shape(PropImage),
	}),
	link: VueTypes.shape(PropLink),
	social: VueTypes.arrayOf(PropLink),
	views: VueTypes.number.isRequired,
	time: VueTypes.number.isRequired,
	date: VueTypes.string.isRequired,
};