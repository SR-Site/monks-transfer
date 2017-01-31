import IDefaultButtonOptions from "../IAbstractButtonOptions";

export interface IButtonMenuOptions extends IDefaultButtonOptions
{
	menuButtonActive: KnockoutObservable<boolean>;
}

export default IButtonMenuOptions;
