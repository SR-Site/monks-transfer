import PageLayoutModel from "./PageLayoutModel";
import InitDataModel from "./InitDataModel";

/**
 * @class SettingsModel
 * @description Class that groups all the models in the app
 */
class SettingsModel
{
	public pageLayoutModel:PageLayoutModel = new PageLayoutModel();
	public initDataModel:InitDataModel = new InitDataModel();
}

export default SettingsModel;
