import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import PersonaType from "../../../data/enum/type/PersonaType";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

interface IBlockPersonaSelectorOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The persona's displayed in the carousel
	 */
	personas: Array<{
		/**
		 * @property
		 * @description The main heading displayed for the persona
		 */
		heading: string;
		/**
		 * @property
		 * @description The main paragraph displayed for the persona
		 */
		paragraph: string;
		/**
		 * @property
		 * @description The type of the persona
		 */
		personaType: PersonaType;
		/**
		 * @property
		 * @description The link added to the persona
		 */
		link: ILink;
		/**
		 * @property
		 * @description The image displayed on the background
		 */
		image: IImage;
	}>;
}

export default IBlockPersonaSelectorOptions;
