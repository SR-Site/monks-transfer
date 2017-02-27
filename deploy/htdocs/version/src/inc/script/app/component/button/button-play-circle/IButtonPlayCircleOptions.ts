import IDefaultButtonOptions from "../IAbstractButtonOptions";

interface IButtonPlayCircleOptions extends IDefaultButtonOptions
{
	isPlaying: KnockoutObservable<boolean>
}

export default IButtonPlayCircleOptions;
