/**
 * Global config file used by the {{#crossLink "app.config.ConfigManager"}}ConfigManager{{/crossLink}}
 *
 *    {
 *		"environments": {
 *			"live": {
 *				"variables": {
 *					"base": "{protocol}//clients.vellance.net/"
 *				},
 *				"urls": {
 *					"api": { "url": "{base}api/flapi.php" }
 *				},
 *				"properties": {
 *					"facebook_appid": "0123456789",
 *					"linkedin_apikey": ""
 *				}
 *			},
 *			"staging": {
 *				"extends": "live",
 *				"variables": {
 *					"base": "{protocol}//staging.vellance.net/"
 *				}
 *			},
 *			"development": {
 *				"extends": "staging",
 *				"variables": {
 *					"base": "{protocol}//devmonks.vellance.net/"
 *				}
 *			},
 *			"local": {
 *				"extends": "development",
 *				"variables": {
 *					"base": ""
 *				}
 *			}
 *		},
 *		"variables": {
 *			"protocol": document.location.protocol
 *		},
 *		"urls": {
 *			"api": { "url": "{base}api/flapi.php" },
 *			"facebook_channelurl": { "url": "{base}channel.html" }
 *		},
 *		"properties": {
 *			"defaultLocale": "en_GB"
 *		}
 *	}
 *
 * @namespace app.config
 * @class config
 */
import {EnvironmentNames, URLNames, VariableNames, PropertyNames} from "../data/enum/ConfigNames";
import IConfig from "../../lib/temple/config/IConfig";

if(typeof window['DEBUG'] === 'undefined')
{
	window['DEBUG'] = true;
}
if(typeof window['RELEASE'] === 'undefined')
{
	window['RELEASE'] = false;
}

/**
 * @todo define
 * @attribute config
 */
let config: IConfig = {
	environments: {
		[EnvironmentNames.PRODUCTION]: {
			variables: {},
			urls: {},
			properties: {
				properties: {
					[PropertyNames.MOCK_CONTENT]: false
				}
			}
		},
		[EnvironmentNames.MONK_APPS]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {},
			urls: {},
			properties: {
				[PropertyNames.MOCK_CONTENT]: false
			}
		},
		[EnvironmentNames.LOCAL]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {},
			urls: {},
			properties: {}
		}
	},
	variables: {
		[VariableNames.PROTOCOL]: document.location.protocol,
		[VariableNames.BASE]: document.querySelector('meta[name=document-base]').getAttribute('content')
	},
	urls: {
		[URLNames.MOCK_API]: {url: `{${VariableNames.BASE}}api/mock/`},
		[URLNames.API]: {url: `{${VariableNames.BASE}}api/v1/`}
	},
	properties: {
		[PropertyNames.DEFAULT_LOCALE]: 'en_US',
		[PropertyNames.MOCK_CONTENT]: true,
		[PropertyNames.MAPBOX_ACCESS_TOKEN]: 'pk.eyJ1IjoibGFyc3ZhbmJyYWFtIiwiYSI6ImNpeW8zNXV2NjAwNjAzM3FsMnV1Z3E4Z2QifQ.UdtOqQiB6YK_lDBthfL6oA',
		[PropertyNames.MAPBOX_MAP_STYLE]: 'mapbox://styles/larsvanbraam/ciyodzuy800ds2sla6tuazga1'
	}
};


/**
 *
 *
 * @attribute environment
 * @type string
 */
let environment: string = EnvironmentNames.PRODUCTION;
let host: string = document.location.host;
if(host.indexOf('mediamonks.local') != -1)
{
	host = 'localhost';
}

switch(host.split(':').shift())
{
	case 'localhost':
	case 'spectrum.dev':
	{
		environment = EnvironmentNames.LOCAL;
		break;
	}

	case 'spectrumreach.jl.monkapps.com':
	{
		environment = EnvironmentNames.MONK_APPS;
		break;
	}

	default:
	{
		environment = EnvironmentNames.PRODUCTION;
		break;
	}
}

let configMethod = {
	config: config,
	environment: environment
};

export default configMethod;
