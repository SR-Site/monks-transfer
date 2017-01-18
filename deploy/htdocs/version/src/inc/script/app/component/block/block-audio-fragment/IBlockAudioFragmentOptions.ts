import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImage from "../../../data/interface/media/IImage";

export interface IBlockAudioFragmentOptions extends IDefaultComponentOptions
{
	name: string;
	description: string;
	image: IImage;
	file: string;
}

export default IBlockAudioFragmentOptions;
