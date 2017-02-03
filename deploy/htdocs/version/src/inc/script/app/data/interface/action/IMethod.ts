import IAction from "./IAction";

interface IMethod extends IAction
{
	/**
	 * @property
	 * @description Callback Method
	 */
	event:()=>void;
}

export default IMethod;