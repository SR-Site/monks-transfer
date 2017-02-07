import IIndexable from "../../../../../lib/temple/core/IIndexable";

interface IState extends IIndexable
{
	marketId: string;
	stateId: string;
	city: string;
	statePostalCode: string;
	label: string;
	offices?: Array<{
		id: string;
		heading: string;
		paragraph: string;
		email: string;
	}>
}

export default IState;