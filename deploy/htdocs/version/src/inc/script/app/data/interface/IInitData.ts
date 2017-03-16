import ILink from "./action/ILink";
import INavigationItem from "./INavigationItem";
import OptionsData from "./OptionsData";

interface IInitData
{
	/**
	 * @description The routes
	 */
	routes: {
		/**
		 * @description The routes
		 */
		landing: string;
		/**
		 * @description The routes
		 */
		notFound: string;
	};
	/**
	 * @description The data for the contact options
	 */
	contactOptions: OptionsData;
	/**
	 * @description The routes
	 */
	csrfToken: string;
	/**
	 * @description The routes
	 */
	layout: {
		/**
		 * @description The routes
		 */
		navigation: Array<INavigationItem>;
		/**
		 * @description The routes
		 */
		footer: {
			/**
			 * @description The routes
			 */
			copyright: string;
			/**
			 * @description The routes
			 */
			contactOptions: {
				/**
				 * @description The routes
				 */
				email: string;
				/**
				 * @description The routes
				 */
				phone: string;
			};
			/**
			 * @description The routes
			 */
			mainLinks: Array<ILink>;
			/**
			 * @description The routes
			 */
			secondaryLinks: Array<Array<ILink>>;
			/**
			 * @description The routes
			 */
			social: {
				/**
				 * @description The routes
				 */
				twitter: ILink;
				/**
				 * @description The routes
				 */
				instagram: ILink;
				/**
				 * @description The routes
				 */
				linkedin: ILink;
			}
		};
		/**
		 * @description The routes
		 */
		slideOutPanel: {
			/**
			 * @description The routes
			 */
			contact: any;
		}
	};
	/**
	 * @description The routes
	 */
	language: any;
}

export default IInitData;
