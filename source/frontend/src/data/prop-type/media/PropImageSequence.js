import VueTypes from 'vue-types';
import PropImageSequenceImage from './PropImageSequenceImage';

/**
 * @param {description} image The base of the image used for the image sequence
 * @param {description} total The total amount of images linked to the image sequence
 * @param {description} extension The extension of the image sequence image
 * @param {description} autoPlay Should the image sequence autoplay
 *
 */
export default {
	image: VueTypes.shape(PropImageSequenceImage).isRequired,
	total: VueTypes.number.isRequired,
	extension: VueTypes.string.isRequired,
	autoPlay: VueTypes.bool,
};
