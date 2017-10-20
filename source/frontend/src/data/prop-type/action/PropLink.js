import VueTypes from 'vue-types';
import { ButtonType, LinkType } from 'vue-block-system';
import backendButtonType from '../../enum/BackendButtonType';
import backendLinkType from '../../enum/BackendLinkType';

export default {
	label: VueTypes.string.isRequired,
	title: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
	type: VueTypes.number.isRequired,
};
