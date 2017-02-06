import IDefaultButtonOptions from "../IAbstractButtonOptions";

interface IButtonMenuOptions extends IDefaultButtonOptions
{
	menuButtonActive: KnockoutObservable<boolean>;
}

export default IButtonMenuOptions;
