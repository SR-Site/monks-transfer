import VideoType from "../../enum/type/VideoType";

interface IVideo
{
	/**
	 * @property
	 * @description The url to the video
	 * @placeholder path/to/video.mp4
	 */
	url:string;
	/**
	 * @property
	 * @description The type of the video
	 * @placeholder 0
	 */
	type:VideoType;
}

export default IVideo;