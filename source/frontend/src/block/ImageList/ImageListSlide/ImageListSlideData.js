import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropLink from '../../../data/prop-type/action/PropLink';

/**
 * @param {description} heading This is the heading of the slide
 * @param {description} paragraph This is the heading of the slide
 * @param {description} image normal: 1200x1200, small: 750x420
 * @param {description} link This is the link of the slide
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink)
}
