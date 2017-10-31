import Vue from 'vue';
import axios from 'axios';
import VueExposePlugin from 'util/VueExposePlugin';
import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import PageNames from 'data/enum/PageNames';
import PagePaths from 'data/enum/PagePaths';
import { createPath } from 'util/routeUtils';
import Params from 'data/enum/Params';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER, GATEWAY, DEVICE_STATE_TRACKER, TASK_LOADER, TRACKING_MANAGER } from 'data/Injectables';
import localeLoader from 'util/localeLoader';
import BlockSystem, { ButtonType, LinkType } from 'vue-block-system';
import block from 'block';
import getStore from 'store';
import { InitDataMutationTypes } from '../store/module/initData';
import NotificationTypes from '../data/enum/NotificationTypes';
import Direction from '../data/enum/Direction';
import Alignment from '../data/enum/Alignment';
import { buttonTypeMap } from '../data/enum/BackendButtonType';
import { linkTypeMap } from '../data/enum/BackendLinkType';
import Theme from '../data/enum/Theme';
import ClassNameHelper from '../util/ClassNameHelper';
import { DeviceState } from '../config/deviceStateConfig';
import Orientation from '../data/enum/Orientation';
import sequentialPromises from '../util/sequentialPromises';
import TrackingProvider from '../util/tracking/TrackingProvider';
import Size from '../data/enum/Size';
import VeeValidate from 'vee-validate';

const initPlugins = () => {
	const configManager = getValue(CONFIG_MANAGER);

	// expose objects to the Vue prototype for easy access in your vue templates and components
	Vue.use(VueExposePlugin, {
		$config: configManager,
		$gateway: getValue(GATEWAY),
		$http: axios,
		$versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
		$staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
		$deviceState: getValue(DEVICE_STATE_TRACKER),
		$taskLoader: getValue(TASK_LOADER),
		$tracking: getValue(TRACKING_MANAGER),
		TrackingProvider,
		URLNames,
		PropertyNames,
		VariableNames,
		PageNames,
		PagePaths,
		Params,
		LinkType,
		ButtonType,
		buttonTypeMap,
		linkTypeMap,
		NotificationTypes,
		Direction,
		Alignment,
		Orientation,
		DeviceState,
		Theme,
		Size,
		ClassNameHelper,
		createPath,
	});

	Vue.use(VeeValidate);

	const mockEnabled = configManager.getVariable(VariableNames.MOCK_ENABLED);
	const base = mockEnabled ? '/static/api/' : '/api/v1/';

	Vue.use(BlockSystem, {
		store: getStore(),
		block,
		config: {
			api: {
				pageCall: `${base}page/{page}${mockEnabled ? '.json' : '?_format=json'}`,
				initCall: `${base}init${mockEnabled ? '.json' : '?_format=json'}`,
			},
			debugLabelStyling: {
				backgroundColor: 'rgba(0,0,255,0.8)',
				zIndex: 999,
			},
			enablePageTransitionOut: false,
		},
	});
};

const waitForLocale = store =>
	new Promise(resolve => {
		if (localeLoader.isLoaded(store.getters.currentLanguage.code)) {
			resolve();
		} else {
			localeLoader.setLoadCallback(locale => {
				if (locale === store.getters.currentLanguage.code) {
					resolve();
				}
			});
		}
	});

const startUp = store => {
	// Initialise plugins
	initPlugins();

	const configManager = getValue(CONFIG_MANAGER);

	const unSubscribe = store.subscribe(mutation => {
		if (mutation.type === 'init/setData') {
			// un-subscribe after we received the setData mutation
			unSubscribe();
			// commit the data to the desired stores
			store.commit(InitDataMutationTypes.SET_LANGUAGE_DATA, mutation.payload.language);
			store.commit(InitDataMutationTypes.SET_CONTACT_OPTIONS_DATA, mutation.payload.contactOptions);
			store.commit(InitDataMutationTypes.SET_LAYOUT_DATA, mutation.payload.layout);
			store.commit(InitDataMutationTypes.SET_CSRF_TOKEN, mutation.payload.csrfToken);
		}
	});

	// Add async methods to the Promise.all array
	return sequentialPromises(
		[
			() => Vue.blockSystemReady,
			() => (configManager.getVariable(VariableNames.LOCALE_ENABLED) ? waitForLocale(store) : Promise.resolve()),
		],
	);
};

export default startUp;
