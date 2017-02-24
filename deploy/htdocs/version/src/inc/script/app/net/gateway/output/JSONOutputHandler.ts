import IOutputHandler from "./IOutputHandler";
import IGatewayOptions from "../IGatewayOptions";
import Type from "../../../../lib/temple/util/Type";

/**
 * Formats the request according to the Flash Gateway 'multipart/json' spec, where each key is a JSON formatted string.
 *
 * @class JSONOutputHandler
 */
class JSONOutputHandler implements IOutputHandler
{
	/**
	 * @method format
	 * @param {string} action
	 * @param {any} data
	 * @param {IGatewayOptions} options
	 * @returns {any} data
	 */
	format(action:string, data:any, options:IGatewayOptions):any
	{
		for (let key in data)
		{
			if (data.hasOwnProperty(key) && (Type.isObject(data[key]) || Type.isArray(data[key])))
			{
				data[key] = JSON.stringify(data[key]);
			}
		}

		options.url += (options.url.indexOf('?') != -1 ? '&' : '?') + 'action=' + action;

		return data;
	}

}

export default JSONOutputHandler;