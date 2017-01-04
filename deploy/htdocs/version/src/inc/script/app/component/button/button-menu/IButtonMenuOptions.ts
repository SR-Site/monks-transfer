import IDefaultButtonOptions from "../IDefaultButtonOptions";

export interface IButtonMenuOptions extends IDefaultButtonOptions
{
	menuButtonActive: KnockoutObservable<boolean>;
}

export default IButtonMenuOptions;
