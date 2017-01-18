import {INavigationItem} from "../model/NavigationModel";

export interface IInitData {
	layout:{
		navigation: Array<INavigationItem>;
		footer: Array<any>;
		slideOutPanel: {
			contact: any;
		}
	};
	language:any;
}
