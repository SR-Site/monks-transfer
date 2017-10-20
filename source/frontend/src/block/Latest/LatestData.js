import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropNewsArticle from '../../data/prop-type/article/PropNewsArticle';

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
	articles: VueTypes.arrayOf(PropNewsArticle),
};
