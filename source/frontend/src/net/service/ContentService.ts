import { getValue } from 'util/injector';
import { replace } from 'lodash';
import { GATEWAY } from 'data/Injectables';
import Endpoints from 'net/Endpoints';

export default class UserService {
	/**
	 * @public
	 * @description Submit the contact form
	 * @param data
	 * @returns {AxiosPromise}
	 */
	public static viewCount(page: string) {
		return getValue(GATEWAY).get(
			replace(Endpoints.getEndpoint(Endpoints.VIEW_COUNT), '{page}', page),
		);
	}
}
