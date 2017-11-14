import VueTypes from 'vue-types';

/**
 * @param {description} name The user who posted the tweet
 * @param {description} handle The handle of the user who posted the tweet
 * @param {description} text The content of the tweet
 * @param {description} date The publish date of the tweet
 * @param {description} target The url to the target tweet
 */
export default {
	name: VueTypes.string.isRequired,
	handle: VueTypes.string.isRequired,
	text: VueTypes.string.isRequired,
	date: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
};
