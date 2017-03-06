import PageLayoutModel from "./PageLayoutModel";
import InitDataModel from "./InitDataModel";
import StateModel from "./StateModel";
import TertiaryMapDataModel from "./TertiaryMapDataModel";

/**
 * @class SettingsModel
 * @description Class that groups all the models in the app
 */
class SettingsModel
{
	public pageLayoutModel: PageLayoutModel = new PageLayoutModel();
	public initDataModel: InitDataModel = new InitDataModel();

	public stateModel:StateModel = new StateModel();
	public tertiaryMapDataModel:TertiaryMapDataModel = new TertiaryMapDataModel();
}

export default SettingsModel;
