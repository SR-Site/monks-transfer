import IIndexable from "../../../../../lib/temple/core/IIndexable";

interface IMarketDetail extends IIndexable
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

export default IMarketDetail;