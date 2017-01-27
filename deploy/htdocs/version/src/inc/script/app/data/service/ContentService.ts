import AbstractService from "./AbstractService";
import IGatewayResult from "../../net/gateway/result/IGatewayResult";
import Endpoints from "../enum/gateway/Endpoints";
import StringUtils from "../../../lib/temple/util/type/StringUtils";

import Promise = require("bluebird");
import IPageLayout from "../interface/layout/IPageLayout";
import IBlock from "../interface/block/IBlock";
import {PropertyNames} from "../enum/ConfigNames";
import configManagerInstance from "../../../lib/temple/config/configManagerInstance";
import URLUtils from "../../../lib/temple/util/URLUtils";

class ContentService extends AbstractService
{

	/**
	 * @public
	 * @method getInit
	 * @returns {Promise<IGatewayResult<any>>}
	 */
	public getInit(): Promise<IGatewayResult<any>>
	{
		return this.gateway.get(Endpoints.getEndpoint(Endpoints.INIT));
	}

	/**
	 * @public
	 * @method getPageLayout
	 * @param {string} pageId The id that's used in the backend to fetch the correct layout
	 * @param {Object} slug The slug that's used for fetching detail pages
	 * @returns {Promise<IGatewayResult<any>>}
	 */
	public getPageLayout(page: string): Promise<IGatewayResult<IPageLayout>>
	{
		if(page.indexOf('?') > -1)
		{
			page = page.substr(0, page.indexOf('?'));
		}

		return this.gateway.get(
			StringUtils.replaceVars(Endpoints.getEndpoint(Endpoints.PAGE_LAYOUT), {page: page})
		)
	}

	/**
	 * @public
	 * @method loadMore
	 * @description Some blocks might have a load more functionality where it loads more blocks into that block, this
	 * method can be used for loading more blocks!
	 * @param endpoint
	 * @param offset
	 * @param limit
	 * @param filter
	 * @returns {Promise<IGatewayResult<any>>}
	 */
	public loadMore(endpoint: string, offset: number, limit: number, filter: {[filterType:string]:string}): Promise<IGatewayResult<{blocks: Array<IBlock>}>>
	{

		return this.gateway.get(
			endpoint,
			Object.assign({
				limit: limit,
				offset: offset
			}, filter)
		);
	}
}

export default ContentService;
