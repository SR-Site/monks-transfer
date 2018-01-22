import { VariableNames } from 'data/enum/configNames';
import { CONFIG_MANAGER } from 'data/Injectables';
import { getValue } from 'util/injector';

/**
 * @class Endpoints
 * @description This class contains all the API endpoints that are used in the services.
 */
class Endpoints {
	/**
	 * @public
	 * @method getEndpoint
	 * @param endpoint
	 */
	public static getEndpoint(endpoint: string): string {
		const mockFlag = getValue(CONFIG_MANAGER).getVariable(VariableNames.MOCK_ENABLED);
		return Endpoints._ENDPOINTS[endpoint][mockFlag ? Endpoints._MOCK : Endpoints._API];
	}

	private static _MOCK: string = 'mock';
	private static _API: string = 'api';

	public static CONTACT: string = 'contact';
	public static CONTACT_KERNEL: string = 'contactKernel';
	public static VIEW_COUNT: string = 'viewCount';

	private static _ENDPOINTS = {
		[Endpoints.CONTACT]: {
			[Endpoints._MOCK]: '/contact.json',
			[Endpoints._API]: '/v1/contact',
		},
		[Endpoints.CONTACT_KERNEL]: {
			[Endpoints._MOCK]: '/contact.json',
			[Endpoints._API]: '/v1/contact',
		},
		[Endpoints.VIEW_COUNT]: {
			[Endpoints._MOCK]: '/view-count.json',
			[Endpoints._API]: '/v1/counter/{page}',
		},
	};
}

export default Endpoints;
