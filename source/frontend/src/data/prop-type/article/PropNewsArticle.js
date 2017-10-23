import VueTypes from 'vue-types';
import PropLink from '../action/PropLink';
import PropImage from '../media/PropImage';

export default {
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
