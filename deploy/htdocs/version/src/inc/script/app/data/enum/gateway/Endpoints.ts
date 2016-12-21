import configManagerInstance from "../../../../lib/temple/config/configManagerInstance";
import {PropertyNames} from "../ConfigNames";
/**
 * @class Endpoints
 * @description This class contains all the API endpoints that are used in the services.
 */
class Endpoints
{
	/**
	 * @public
	 * @method getEndpoint
	 * @param {string} endpoint
	 * @description Method that returns the correct endpoint based on the config file
	 */
	public static getEndpoint(endpoint: string): string
	{
		let mockContent:boolean = configManagerInstance.getProperty(PropertyNames.MOCK_CONTENT);

		return Endpoints._ENDPOINTS[endpoint][mockContent ? Endpoints._MOCK : Endpoints._API]
	}

	/**
	 * @description Define all the unique endpoints below this point
	 * @type {string}
	 */
	public static INIT: string = 'init';
	public static PAGE_LAYOUT: string = 'pageLayout';

	/**
	 * Define the types of api's below this point
	 * @type {string}
	 * @private
	 */
	private static _MOCK: string = 'mock';
	private static _API: string = 'api';

	/**
	 * @private
	 * @static
	 * @property _ENDPOINTS
	 * @description Define all your endpoints for the mock API and the real api
	 */
	private static _ENDPOINTS = {
		[Endpoints.INIT]: {
			[Endpoints._MOCK]: 'init.json',
			[Endpoints._API]: 'init'
		},
		[Endpoints.PAGE_LAYOUT]: {
			[Endpoints._MOCK]: '{page}.json',
			[Endpoints._API]: 'pages/{page}'
		}
	};
}

export default Endpoints; 
