import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import PersonaType from "../../../data/enum/type/PersonaType";
import ILink from "../../../data/interface/action/ILink";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockPersonaSelectorOptions extends IAbstractBlockComponentOptions
{
	personas: Array<{
		heading: string;
		paragraph: string;
		personaType: PersonaType;
		link: ILink;
		image: IImage;
	}>
}

export default IBlockPersonaSelectorOptions;
