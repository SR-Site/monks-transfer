import IImage from "./IImage";

interface IImageSequence
{
	/**
	 * @property
	 * @description the base paths of the images in the sequences without the extension
	 */
	image:IImage
	/**
	 * @property
	 * @description The total amount of frames in the image sequence
	 */
	total:number;
	/**
	 * @property
	 * @description The extension of the image
	 */
	extension:string;
	/**
	 * @property
	 * @description do we want to autoplay the sequence or want to trigger it manually
	 */
	autoplay?:boolean;
}

export default IImageSequence;
