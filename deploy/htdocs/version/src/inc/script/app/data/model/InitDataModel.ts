import {IInitData} from "../interface/IInitData";
import LayoutModel from "./LayoutModel";

class InitDataModel
{
	public layoutModel: LayoutModel = new LayoutModel();

	private _data: IInitData;

	set data(data: IInitData)
	{
		this._data = data;

		this.layoutModel.addSlideOutPanel(data.layout.slideOutPanel);
	}

	get data(): IInitData
	{
		return this._data;
	}
}

export default InitDataModel;
