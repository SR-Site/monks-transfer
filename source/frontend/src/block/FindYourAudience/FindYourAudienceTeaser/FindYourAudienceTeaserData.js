import PropImage from '../../../data/prop-type/media/PropImage';
import VueTypes from 'vue-types';
import PropVideo from '../../../data/prop-type/media/PropVideo';

/**
 * @param {description} image The heading of the category
 * @param {description} video The paragraph of the category
 * @param {description} heading The heading of the audience teaser block
 * @param {description} subHeading The sub heading of the teaser
 * @param {description} paragraph The paragraph of the teaser
 * @param {description} reaches The list of reaches, should be strings
 */
export default {
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	reaches: VueTypes.array.isRequired,
};
