export const SET_LANGUAGE_DATA = 'setLanguageData';
export const SET_LAYOUT_DATA = 'setLayoutData';
export const SET_CONTACT_OPTIONS_DATA = 'setContactOptionsData';

export default {
	namespaced: true,
	state: {
		language: {},
		layout: {},
		contactOptions: {},
	},
	getters: {
		contactOption: state => contactOption => state.contactOptions[contactOption] || {},
	},
	mutations: {
		[SET_LANGUAGE_DATA]: (state, data) => {
			state.language = data;
		},
		[SET_LAYOUT_DATA]: (state, data) => {
			state.layout = data;
		},
		[SET_CONTACT_OPTIONS_DATA]: (state, data) => {
			state.contactOptions = data;
		},
	},
	actions: {},
};
