import VideoType from "../../enum/type/VideoType";

interface IVideo
{
	/**
	 * @property
	 * @description The url to the video
	 */
	url:string;
	/**
	 * @property
	 * @description The type of the video
	 */
	type:VideoType;
}

export default IVideo;