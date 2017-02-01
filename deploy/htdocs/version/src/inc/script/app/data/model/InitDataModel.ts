import {IInitData} from "../interface/IInitData";
import LayoutModel from "./LayoutModel";
import ILink from "../interface/action/ILink";
import NavigationModel from "./NavigationModel";

class InitDataModel
{
	public layoutModel: LayoutModel = new LayoutModel();
	public navigationModel:NavigationModel = new NavigationModel();

	private _data: IInitData;

	set data(data: IInitData)
	{
		this._data = data;

		this.layoutModel.addSlideOutPanel(data.layout.slideOutPanel);
		this.navigationModel.addItems(data.layout.navigation);
	}

	get data(): IInitData
	{
		return this._data;
	}
}

export default InitDataModel;
