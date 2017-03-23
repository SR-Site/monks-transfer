import ILink from "./action/ILink";
import INavigationItem from "./INavigationItem";
import IContactOptions from "./IContactOptions";

interface IInitData
{
	/**
	 * @description Any hardcoded routes that will be used for redirection
	 */
	routes: {
		/**
		 * @description The default landing route if no route is provided
		 */
		landing: string;
		/**
		 * @description The default route if a page is not found
		 */
		notFound: string;
	};
	/**
	 * @description The data used for contacting
	 */
	contactOptions: IContactOptions;
	/**
	 * @description The csrfToken used for posting the contact form to the backend
	 */
	csrfToken: string;
	/**
	 * @description The structure of the layout
	 */
	layout: {
		/**
		 * @description The main navigation items
		 */
		navigation: Array<INavigationItem>;
		/**
		 * @description The footer layout structure
		 */
		footer: {
			/**
			 * @description The copyright label
			 */
			copyright: string;
			/**
			 * @description The footer contact options
			 */
			contactOptions: {
				/**
				 * @description The email address used to contact to
				 */
				email: string;
				/**
				 * @description The phone number used to contact to
				 */
				phone: string;
			};
			/**
			 * @description The main links for the footer navigation
			 */
			mainLinks: Array<ILink>;
			/**
			 * @description The secondary links for the footer navigation
			 */
			secondaryLinks: Array<Array<ILink>>;
			/**
			 * @description The social items in the footer
			 */
			social: {
				/**
				 * @description The link for twitter
				 */
				twitter: ILink;
				/**
				 * @description The link for Instagram
				 */
				instagram: ILink;
				/**
				 * @description The link for LinkedIn
				 */
				linkedin: ILink;
			}
		};
		/**
		 * @description The data for the global slide-out panels
		 */
		slideOutPanel: {
			/**
			 * @description The data for the contact panel
			 */
			contact: any;
		}
	};
	/**
	 * @ignore
	 * @description Any language stuff could go here, ignore for now!
	 */
	language: any;
}

export default IInitData;
