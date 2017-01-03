import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockImageCallToActionsOptions extends IDefaultComponentOptions
{
	callToActions:Array<{
		heading: string;
		background:IImage
		backgroundBlurred:IImage;
	}>
}

export default IBlockImageCallToActionsOptions;
