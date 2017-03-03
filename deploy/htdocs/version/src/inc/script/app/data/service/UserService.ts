import AbstractService from "./AbstractService";
import IGatewayResult from "../../net/gateway/result/IGatewayResult";
import Endpoints from "../enum/gateway/Endpoints";

import Promise = require("bluebird");
import DataManager from "../DataManager";

class UserService extends AbstractService
{

	/**
	 * @public
	 * @method getInit
	 * @returns {Promise<IGatewayResult<any>>}
	 */
	public contact(data: IContactData): Promise<IGatewayResult<any>>
	{
		return this.gateway.post(
			Endpoints.getEndpoint(Endpoints.CONTACT),
			JSON.stringify(data),
			{
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-Token': DataManager.getInstance().settingsModel.initDataModel.data.csrfToken
				}
			}
		);
	}
}

export interface IContactData
{
	firstName: string;
	lastName: string;
	company: string;
	city: string;
	state: string;
	email: string;
	phone: string;
	zipCode: string;
	comments: string;
}

export default UserService;
