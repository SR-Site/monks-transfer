import Promise = require("bluebird");

/**
 * @class AssetLoader
 * @description Simple class used for loading assets
 *
 */
class AssetLoader
{
	/**
	 * @public static
	 * @method loadImage
	 * @param source
	 * @returns {Promise}
	 */
	public static loadImage(source: string): Promise<HTMLImageElement>
	{
		return new Promise((resolve: (image: HTMLImageElement) => void, reject: (error: string) => void) =>
		{
			let tmpImage = new Image();

				// Set to Anonymous to allow cross domain assets on canvas
				tmpImage.crossOrigin = 'Anonymous';

			$(tmpImage)
				.on('load', (event) => resolve(tmpImage))
				.on('error', (reason) => reject('Could not start image load; error processing image'))
				.attr('src', source)

		})
	}

	/**
	 * @public static
	 * @method loadImages
	 * @param sources
	 * @returns {Promise}
	 */
	public static loadImages(sources: Array<string>): Promise<Array<{image: HTMLImageElement;index: number;}>>
	{
		let loadedCount: number = 0;
		const totalImages: number = sources.length;
		let images: Array<{image: HTMLImageElement;index: number;}> = [];

		return new Promise((resolve: (images: Array<any>) => void, reject: (error: string) => void) =>
		{
			sources.forEach((source: string, index: number) =>
			{
				AssetLoader.loadImage(source)
					.then((image: HTMLImageElement) =>
					{
						++loadedCount;

						images.push({
							image: image,
							index: index
						});

						if(totalImages == loadedCount)
						{
							// Sort image in same order as they were sent.
							images.sort((a, b) =>
							{
								return a.index - b.index;
							});

							resolve(images);
						}
					})
					.catch((reason) => console.log('[Unable to load image', reason));
			});
		});
	}
}

export default AssetLoader;
