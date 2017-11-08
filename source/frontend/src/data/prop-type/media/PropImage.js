import VueTypes from 'vue-types';

/**
 * @param {description} normal This is the path to the normal image
 * @param {placeholder} normal /path/to/image.jpg
 * @param {description} small This is the path to the small image
 * @param {placeholder} small /path/to/image.jpg
 * @param {description} alt This is the Alt Text of an image.
 * @param {placeholder} alt Alt text here
 */
export default {
	normal: VueTypes.string.isRequired,
	small: VueTypes.string.isRequired,
	alt: VueTypes.string.isRequired,
};
