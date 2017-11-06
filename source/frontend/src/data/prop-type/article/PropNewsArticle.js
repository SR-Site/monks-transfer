import VueTypes from 'vue-types';
import PropLink from '../action/PropLink';
import PropImage from '../media/PropImage';
import PropAuthor from './PropAuthor';

/**
 * @param {description} heading The heading of the article
 * @param {description} subHeading The subHeading of the article
 * @param {description} paragraph The paragraph of the article
 * @param {description} target The target of the article
 * @param {description} image The image linked to the article
 * @param {description} tags The list of tags linked to the article
 * @param {description} author The author linked to the article
 * @param {description} link The link on the article
 * @param {description} social The list of social links to the article
 * @param {description} views The views of the article
 * @param {description} time The reading time of the article
 * @param {description} date The publish date of the article
 */
export default {
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
	tags: VueTypes.arrayOf(VueTypes.shape(PropLink)),
	theme: VueTypes.number.isRequired,
	author: VueTypes.shape(PropAuthor),
	link: VueTypes.shape(PropLink),
	social: VueTypes.arrayOf(
		VueTypes.shape(PropLink),
	),
	views: VueTypes.number.isRequired,
	time: VueTypes.number.isRequired,
	date: VueTypes.string.isRequired,
};
