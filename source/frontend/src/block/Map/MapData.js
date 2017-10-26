import VueTypes from 'vue-types';
import PropImageSequence from '../../data/prop-type/media/PropImageSequence';
import PropImage from '../../data/prop-type/media/PropImage';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	imageSequence: VueTypes.shape(PropImageSequence).isRequired,
	sequenceBackground: VueTypes.shape(PropImage),
	steps: VueTypes.arrayOf(
		VueTypes.shape(
			{
				label: VueTypes.string.isRequired,
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string.isRequired,
			},
		),
	),
};
