import initData, { SET_CONTACT_OPTIONS_DATA, SET_LANGUAGE_DATA, SET_LAYOUT_DATA, SET_CSRF_TOKEN } from './initData';

export const InitDataNamespace = 'initData';

export const InitDataMutationTypes = {
	SET_LANGUAGE_DATA: `${InitDataNamespace}/${SET_LANGUAGE_DATA}`,
	SET_LAYOUT_DATA: `${InitDataNamespace}/${SET_LAYOUT_DATA}`,
	SET_CONTACT_OPTIONS_DATA: `${InitDataNamespace}/${SET_CONTACT_OPTIONS_DATA}`,
	SET_CSRF_TOKEN: `${InitDataNamespace}/${SET_CSRF_TOKEN}`,
};

export default initData;
