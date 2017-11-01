import Theme from 'data/enum/Theme';

export const SET_LANGUAGE_DATA = 'setLanguageData';
export const SET_LAYOUT_DATA = 'setLayoutData';
export const SET_CONTACT_OPTIONS_DATA = 'setContactOptionsData';
export const SET_CSRF_TOKEN = 'setCsrfToken';

export default {
	namespaced: true,
	state: {
		language: {},
		layout: {},
		contactOptions: {},
		csrfToken: null,
	},
	getters: {
		contactOption: state => contactOption => state.contactOptions[contactOption] || {},
		slideOutData: state => panel => state.layout.slideOutPanel[panel] || {},
		footerData: state => state.layout.footer || {},
		csrfToken: state => state.csrfToken,
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
		[SET_CSRF_TOKEN]: (state, data) => {
			state.csrfToken = data;
		},
	},
	actions: {},
};
