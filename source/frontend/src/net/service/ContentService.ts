import { getValue } from 'util/injector';
import replace from 'lodash/replace'
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

	/**
	 * @public
	 * @method loadPage
	 * @description Some blocks might have a load more functionality where it loads more blocks into that block, this
	 * method can be used for loading more blocks!
	 * @param {string} endpoint
	 * @param {number} offset
	 * @param {number} limit
	 * @param {{[p: string]: string}} filter
	 */
	public static loadPage(
		endpoint: string,
		offset: number,
		limit: number,
		filter: { [filterType: string]: string },
	) {
		if (endpoint.indexOf('/') === 0) {
			endpoint = endpoint.substring(1);
		}

		return getValue(GATEWAY).get(
			endpoint,
			{
				params: Object.assign(
					{
						limit,
						offset,
						_format: 'json',
					},
					filter,
				),
			},
		);
	}
}
