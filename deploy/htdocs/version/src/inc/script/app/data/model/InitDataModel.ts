import LayoutModel from "./LayoutModel";
import NavigationModel from "./NavigationModel";
import ILink from "../interface/action/ILink";
import IInitData from "../interface/IInitData";
import IContactOptions from "../interface/IContactOptions";

class InitDataModel
{
	public layoutModel: LayoutModel = new LayoutModel();

	public navigationModel: NavigationModel = new NavigationModel();

	private _data: IInitData;

	/**
	 * @public
	 * @method set data
	 * @param data
	 */
	public set data(data: IInitData)
	{
		this._data = data;

		this.layoutModel.addSlideOutPanel(data.layout.slideOutPanel);

		this.navigationModel.addItems(data.layout.navigation);
	}

	/**
	 * @public
	 * @method get data
	 * @returns {IInitData}
	 */
	public get data(): IInitData
	{
		return this._data;
	}

	/**
	 * @public
	 * @method getContactOptions
	 */
	public get contactOptions(): IContactOptions
	{
		return this._data.contactOptions
	}

	/**
	 * @public
	 * @method get landingRoute
	 * @returns {string}
	 */
	public get landingRoute(): string
	{
		return this._data.routes.landing;
	}

	/**
	 * @public
	 * @method get notFound
	 * @returns {string}
	 */
	public get notFoundRoute(): string
	{
		return this._data.routes.notFound;
	}

	/**
	 * @public
	 * @method get footerData
	 * @returns {{contactOptions: {email: string, phone: string}, mainLinks: Array<ILink>, secondaryLinks: Array<Array<ILink>>}}
	 */
	public get footerData(): {
		contactOptions: {email: string; phone: string;};
		mainLinks: Array<ILink>;
		secondaryLinks: Array<Array<ILink>>;
	}
	{
		return this._data.layout.footer;
	}
}

export default InitDataModel;
