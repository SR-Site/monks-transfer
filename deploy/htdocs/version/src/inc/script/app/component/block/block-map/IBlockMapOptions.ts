import IDefaultComponentOptions from "../IDefaultComponentOptions";
import IImageSequence from "../../../data/interface/media/IImageSequence";

export interface IBlockMapOptions extends IDefaultComponentOptions
{
	imageSequence: IImageSequence;
	steps: Array<{label: string}>;
}

export default IBlockMapOptions;
