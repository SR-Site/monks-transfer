import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	steps: VueTypes.arrayOf(
		VueTypes.shape(
			{
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string.isRequired,
				background: VueTypes.shape(PropImage),
				secondaryParagraph: VueTypes.string.isRequired,
			},
		),
	).isRequired,
};
