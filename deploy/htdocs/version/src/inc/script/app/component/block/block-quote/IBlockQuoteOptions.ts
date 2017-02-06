import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";

interface IBlockQuoteOptions extends IAbstractBlockComponentOptions
{
	image:IImage;
	quote:string;
	name:string;
	description:string;
}

export default IBlockQuoteOptions;
