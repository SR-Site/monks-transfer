interface IImage {
	/**
	 * @property
	 * @description The large version of the image
	 * @placeholder path/to/image.jpg
	 */
	normal: string;
	/**
	 * @property
	 * @description The small version of the image
	 * @placeholder path/to/image.jpg
	 */
	small: string;
	/**
	 * @property
	 * @description The alt text of the image
	 */
	alt: string;
}

export default IImage;
