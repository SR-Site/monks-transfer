import VueTypes from 'vue-types';
import { ButtonType } from 'vue-block-system';

export default {
	label: VueTypes.string,
	title: VueTypes.string.isRequired,
	type: VueTypes.oneOf([ButtonType.ACTION]).isRequired,
};
