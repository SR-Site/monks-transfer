import ILink from "../interface/action/ILink";
import AbstractDataModel from "./AbstractDataModel";

class NavigationModel extends AbstractDataModel<INavigationItem>
{

}

export interface INavigationItem {
	link:ILink;
	subtitle?:string;
}

export default NavigationModel;