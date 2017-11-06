import VueTypes from 'vue-types';

/**
 * @param {description} normal This is the path to the normal image
 * @param {placeholder} normal /map/desktop/map_lines_
 * @param {description} small This is the path to the small image
 * @param {placeholder} small /map/mobile/map_lines_
 * @param {description} alt This is the Alt Text of an image.
 * @param {placeholder} alt Alt text here
 */
export default {
	normal: VueTypes.string.isRequired,
	small: VueTypes.string.isRequired,
	alt: VueTypes.string.isRequired,
};
