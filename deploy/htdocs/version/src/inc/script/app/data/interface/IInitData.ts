import {INavigationItem} from "../model/NavigationModel";
import ILink from "./action/ILink";

export interface IInitData
{
	layout: {
		navigation: Array<INavigationItem>;
		footer: {
			copyright: string;
			contactOptions: {
				email: string;
				phone: string;
			};
			mainLinks: Array<ILink>;
			secondaryLinks: Array<Array<ILink>>;
			social: {
				twitter: ILink;
				youtube: ILink;
				linkedin: ILink;
			}
		};
		slideOutPanel: {
			contact: any;
		}
	};
	language: any;
}
