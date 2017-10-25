import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	callToActions: VueTypes.arrayOf(
		VueTypes.shape({
			heading: VueTypes.string.isRequired,
			paragraph: VueTypes.string.isRequired,
			background: VueTypes.shape(PropImage).isRequired,
			backgroundBlurred: VueTypes.shape(PropImage).isRequired,
			link: VueTypes.shape(PropLink).isRequired,
			theme: VueTypes.number.isRequired,
		}),
	).isRequired,
};
