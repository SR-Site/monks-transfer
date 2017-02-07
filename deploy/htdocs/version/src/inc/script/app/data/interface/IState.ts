import IIndexable from "../../../lib/temple/core/IIndexable";

interface IState extends IIndexable
{
	coordinates: {
		lat: number;
		lng: number;
	}
	label: string;
}

export default IState;