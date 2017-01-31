import IAction from "./IAction";

interface IMethod extends IAction
{
	event:()=>void;
}

export default IMethod;