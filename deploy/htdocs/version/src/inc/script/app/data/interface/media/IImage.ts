interface IImage
{
	/**
	 * @property
	 * @description The large version of the image
	 */
	normal: string;
	/**
	 * @property
	 * @description The small version of the image
	 */
	small: string;
	/**
	 * @property
	 * @description The alt text of the image
	 */
	alt: string;
}

export default IImage;