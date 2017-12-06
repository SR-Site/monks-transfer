import { EnvironmentNames, PropertyNames, URLNames, VariableNames } from 'data/enum/configNames';

const config = {
	environments: {
		[EnvironmentNames.PRODUCTION]: {
			variables: {},
			urls: {},
			properties: {
				[PropertyNames.GOOGLE_ANALYTICS]: 'UA-67197200-2',
			},
		},
		[EnvironmentNames.STAGING]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.LOCAL_DRUPAL]: {
			extends: EnvironmentNames.DEVELOPMENT,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.DEVELOPMENT]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {
				[VariableNames.DEBUG_LABEL_ENABLED]: true,
			},
			urls: {},
		},
		[EnvironmentNames.LOCAL]: {
			extends: EnvironmentNames.DEVELOPMENT,
			properties: {
				[PropertyNames.MAPBOX_ACCESS_TOKEN]:
					'pk.eyJ1IjoibGFyc3ZhbmJyYWFtIiwiYSI6ImNpeW8zNXV2NjAwNjAzM3FsMnV1Z3E4Z2QifQ.UdtOqQiB6YK_lDBthfL6oA',
				[PropertyNames.MAPBOX_MAP_STYLE]: 'mapbox://styles/larsvanbraam/ciyodzuy800ds2sla6tuazga1',
			},
			variables: {
				[VariableNames.MOCK_ENABLED]: true,
				[VariableNames.DEBUG_LABEL_ENABLED]: true,
			},
			urls: {},
		},
	},
	variables: {
		[VariableNames.LOCALE_ENABLED]: true,
		[VariableNames.LOCALE_ROUTING_ENABLED]: false,
		[VariableNames.MOCK_ENABLED]: false,
		[VariableNames.DEBUG_LABEL_ENABLED]: false,
		[VariableNames.VERSIONED_STATIC_ROOT]: process.env.VERSIONED_STATIC_ROOT,
		[VariableNames.STATIC_ROOT]: process.env.STATIC_ROOT,
		[VariableNames.PUBLIC_PATH]: process.env.PUBLIC_PATH,
	},
	urls: {
		[URLNames.LOCALE]: `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`,
		[URLNames.API]: `${process.env.PUBLIC_PATH}api/`,
	},
	properties: {
		[PropertyNames.DEFAULT_LOCALE]: 'en-us',
		[PropertyNames.AVAILABLE_LOCALES]: ['en-us'],
		[PropertyNames.MAPBOX_ACCESS_TOKEN]:
			'pk.eyJ1IjoibWVkaWFzb2x1dGlvbnMiLCJhIjoiY2owNDY5bTF2MGVpNzJxcDNoM2tvMXRoOCJ9.huElzhuVhxP52X6okUoB-w',
		[PropertyNames.MAPBOX_MAP_STYLE]: 'mapbox://styles/mediasolutions/cj1a5z3td003e2rpauzcq162n',
		[PropertyNames.GOOGLE_ANALYTICS]: '123456789',
		[PropertyNames.FACEBOOK_PIXEL]: '1499374196803695',
		[PropertyNames.TWITTER_PIXEL]: 'nx7ko',
		[PropertyNames.LINKEDIN_PIXEL]: '41619',
		[PropertyNames.HOTJAR]: '481416',
		[PropertyNames.PARDOT_APP]: '85712',
		[PropertyNames.PARDOT_CLIENT]: '13314',
		[PropertyNames.FORENSICS]: '103509',
	},
};

let environment = EnvironmentNames.PRODUCTION;
const { host } = document.location;

switch (host.split(':').shift()) {
	case 'localhost': {
		environment = EnvironmentNames.LOCAL;
		break;
	}
	case 'spectrum.loc': {
		environment = EnvironmentNames.LOCAL_DRUPAL;
		break;
	}
	case '107.189.68.170': {
		environment = EnvironmentNames.DEVELOPMENT;
		break;
	}
	default: {
		environment = EnvironmentNames.PRODUCTION;
		break;
	}
}

export default {
	config,
	environment,
};
