import {INavigationItem} from "../model/NavigationModel";
import ILink from "./action/ILink";

export interface IInitData
{
	contactOptions: IContactOptions
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
				vimeo: ILink;
				linkedin: ILink;
			}
		};
		slideOutPanel: {
			contact: any;
		}
	};
	language: any;
}

export interface IContactOptions
{
	phone: {
		phoneNumber: string;
	}
	email: {
		emailAddress: string;
		emailBody: string;
		emailSubject: string;
	}
}