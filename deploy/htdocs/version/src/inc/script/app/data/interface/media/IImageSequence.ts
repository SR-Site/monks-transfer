import IImage from "./IImage";

interface IImageSequence
{
	image:IImage
	total:number;
	extension:string;
	autoplay?:boolean;
}

export default IImageSequence;
