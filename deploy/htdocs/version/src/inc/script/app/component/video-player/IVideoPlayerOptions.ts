import IVideo from "../../data/interface/media/IVideo";
import IImage from "../../data/interface/media/IImage";

interface IVideoPlayerOptions
{
	video: IVideo;
	title?:string;
	poster?: IImage;
	loop?: boolean;
	controls?: boolean;
}

export default IVideoPlayerOptions;
