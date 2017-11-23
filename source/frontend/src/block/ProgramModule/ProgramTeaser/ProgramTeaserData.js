import VueTypes from 'vue-types';
import PropLink from '../../../data/prop-type/action/PropLink';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropVideo from '../../../data/prop-type/media/PropVideo';

/**
 * @param {description} heading The heading displayed on the persona
 * @param {description} paragraph The paragraph displayed on the persona
 * @param {description} target The url target of the program
 * @param {description} stats The stats for the program
 * @param {description} stats.percentage The percentage level
 * @param {description} stats.demographic The demographic label
 * @param {description} image normal: 1280x720, small: 1280x720
 * @param {description} video The video linked to the program
 * @param {description} tags The array of tags linked to the program
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
	stats: VueTypes.shape({
		percentage: VueTypes.number.isRequired,
		demographic: VueTypes.string.isRequired,
	}),
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	tags: VueTypes.arrayOf(VueTypes.shape(PropLink)),
};
