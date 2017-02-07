import IPageLayout from "../interface/layout/IPageLayout";
import AbstractDataModel from "./AbstractDataModel";
import DataManager from "../DataManager";
import Promise = require("bluebird");
import BlockHelper from "../../util/BlockHelper";
import Routes from "../../config/Routes";
import {PropertyNames} from "../enum/ConfigNames";
import configManagerInstance from "../../../lib/temple/config/configManagerInstance";

class PageLayoutModel extends AbstractDataModel<IPageLayout>
{
	/**
	 * @property _unknownDeeplinks
	 * @type {Array}
	 * @description array used to store unknown deeplinks to avoid re-calling deeplinks that do not exist
	 */
	private _unknownDeeplinks: Array<string> = [];

	/**
	 * @public
	 * @method getLayout
	 * @description Method to retrieve a page layout based on the deeplink + branch
	 * @param page
	 * @returns {Promise}
	 */
	public getLayout(page: string): Promise<IPageLayout>
	{
		// First try to fetch the page from memory
		if(this._unknownDeeplinks.indexOf(page) > -1)
		{
			// Incorrect deeplink, reject right away
			return Promise.reject(null)
		}
		else if(this.hasItem(page))
		{
			return Promise.resolve(this.getItemById(page))
		}
		else
		{
			// If it's not loaded, fetch it from the backend
			return DataManager.getInstance().serviceModel.contentService.getPageLayout(page)
				.then((result) => this.parsePageLayout(result.data, page))
				.catch((result) =>
				{
					if(configManagerInstance.getProperty(PropertyNames.MOCK_CONTENT))
					{
						return this.getLayout(Routes.PAGE_NOT_FOUND);
					}
					else
					{
						this._unknownDeeplinks.push(page);

						return Promise.reject(null)
					}
				})
		}
	}


	/**
	 * @private
	 * @method parsePageLayout
	 * @description After we fetch the page from the API we need to check all the blocks if they are compatible with the
	 * with our block configuration.
	 */
	private parsePageLayout(pageLayout: IPageLayout, pageId: string): Promise<IPageLayout>
	{
		return new Promise((resolve: (result: IPageLayout) => void, reject) =>
		{
			// Create the layout object
			let layout: IPageLayout = {
				id: pageId,
				headerTheme: pageLayout.headerTheme,
				hideContactButton: pageLayout.hideContactButton,
				pageTitle: pageLayout.pageTitle,
				blocks: []
			};

			// Loop through all the blocks and check if they are valid
			layout.blocks = BlockHelper.parseBlocks(layout.blocks, pageLayout.blocks);

			// Save the layout
			this.addItem(layout);

			resolve(layout);
		});
	}

}

export default PageLayoutModel;
