import IIndexable from "../../../../../lib/temple/core/IIndexable";

interface IState extends IIndexable
{
	state: string;
	label: string;
	offices?: Array<{
		id: string;
		heading: string;
		paragraph: string;
		email: string;
	}>
}

export default IState;