import ITag from "./action/ITag";
import IImage from "./media/IImage";
import Theme from "../enum/style/Theme";

interface INewsArticle
{
	/**
	 * @property
	 * @description The main heading displayed
	 */
	heading: string;
	/**
	 * @property
	 * @description The main paragraph displayed
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The target that the teaser should link to
	 */
	target: string;
	/**
	 * @property
	 * @description The image that will be displayed in the article teaser
	 */
	image: IImage;
	/**
	 * @property
	 * @description The tags linked to this article
	 */
	tags?: Array<ITag>;
	/**
	 * @property
	 * @description Sometimes you want to switch a color based on the background image to increase readability
	 * @placeholder 1
	 * @defaultValue 0
	 */
	theme: Theme;
}

export default INewsArticle;