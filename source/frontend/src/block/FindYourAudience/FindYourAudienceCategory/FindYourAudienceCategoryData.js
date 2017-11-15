import VueTypes from 'vue-types';
import FindYourAudienceTeaserData from '../FindYourAudienceTeaser/FindYourAudienceTeaserData';

export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	items: VueTypes.arrayOf(
		VueTypes.shape(FindYourAudienceTeaserData),
	).isRequired,
};
