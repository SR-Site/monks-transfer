import IDefaultComponentOptions from "../IDefaultComponentOptions";

export interface IBlockFilterContentOptions extends IDefaultComponentOptions
{
	endpoint: string;
	filterLabel: string;
	filters: Array<{
		type: number;
		options: Array<{
			value: string;
			label: string;
		}>
	}>;
}

export default IBlockFilterContentOptions;
