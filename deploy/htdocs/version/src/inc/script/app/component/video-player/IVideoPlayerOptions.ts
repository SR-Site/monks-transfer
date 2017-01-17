import IVideo from "../../data/interface/media/IVideo";
import IImage from "../../data/interface/media/IImage";

export interface IVideoPlayerOptions
{
	video:IVideo;
	poster?:IImage;
	loop?:boolean;
	controls?:boolean;
}

export default IVideoPlayerOptions;
