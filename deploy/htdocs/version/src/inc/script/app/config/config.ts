
/**
 * Global config file used by the {{#crossLink "app.config.ConfigManager"}}ConfigManager{{/crossLink}}
 *
 *	{
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
var config:IConfig =
{
	environments:
	{
		[EnvironmentNames.PRODUCTION]:
		{
			variables:
			{
			},
			urls:
			{
			},
			properties:
			{
			}
		},
		[EnvironmentNames.LOCAL]:
		{
			extends: EnvironmentNames.PRODUCTION,
			variables:
			{
			}
		}
	},
	variables:
	{
		[VariableNames.PROTOCOL]: document.location.protocol,
		[VariableNames.BASE]: document.querySelector('meta[name=document-base]').getAttribute('content')
	},
	urls:
	{
		[URLNames.API]: { url: `{${VariableNames.BASE}}api` }
	},
	properties:
	{
		[PropertyNames.DEFAULT_LOCALE]: 'en_GB'
	}
};


/**
 *
 *
 * @attribute environment
 * @type string
 */
var environment:string = EnvironmentNames.PRODUCTION;
var host:string = document.location.host;
if(host.indexOf('mediamonks.local') != -1)
{
	host = 'localhost';
}

switch(host.split(':').shift())
{
	case 'localhost':
	{
		environment = EnvironmentNames.LOCAL;
		break;
	}

	default:
	{
		environment = EnvironmentNames.PRODUCTION;
		break;
	}
}


var configMethod = {
	config: config,
	environment: environment
};

export default configMethod;