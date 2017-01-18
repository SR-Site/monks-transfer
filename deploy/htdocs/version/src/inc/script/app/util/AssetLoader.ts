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
	 * @method loadImages
	 * @param sources
	 * @returns {Promise}
	 */
	public static loadImages(sources:Array<string>):Promise<Array<{image:HTMLImageElement;index:number;}>>
	{
		let loadedCount:number = 0;
		const totalImages:number = sources.length;
		let images:Array<{image:HTMLImageElement;index:number;}> = [];

		return new Promise((resolve: (images: Array<any>)=>void, reject: (error: string)=>void) =>
		{
			sources.forEach((source:string, index:number) =>{
				let tmpImage = new Image();

				$(tmpImage).on('load', (event) =>{
					++loadedCount;

					images.push({
						image: tmpImage,
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
				.on('error', (reason) => reject('Could not start image load; error processing images'))
				.attr('src', sources[index])
			});
		});
	}
}

export default AssetLoader;
