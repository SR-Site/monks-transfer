import AbstractLoadTask from 'util/preloading/task/AbstractLoadTask';

/**
 * @description Load images in the TaskLoader
 *
 * Example:
 * ```typescript
 *  new LoadImageTask({
 *      assets: ['path/to/image.jpg'],
 *      onAssetLoaded: result => console.log(result),
 *  })
 * ```
 */
export default class LoadImageTask extends AbstractLoadTask<HTMLImageElement> {
	/**
	 * @private
	 * @method loadImage
	 * @param {string} src
	 * @returns {Promise<void>}
	 */
	public loadAsset(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve: (image: HTMLImageElement) => void, reject: () => void) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.crossOrigin = 'anonymous';
			image.onerror = reject;
			image.src = src;
		});
	}
}