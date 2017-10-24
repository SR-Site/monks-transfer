import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';

export default {
	personas: VueTypes.arrayOf(
		VueTypes.shape(
			{
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string.isRequired,
				personaType: VueTypes.number.isRequired,
				link: VueTypes.shape(PropLink).isRequired,
				image: VueTypes.shape(PropImage).isRequired,
			},
		),
	),
};
