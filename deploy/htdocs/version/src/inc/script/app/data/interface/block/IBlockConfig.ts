import BlockType from "../../enum/type/BlockType";

export interface IBlockConfig
{
	[index: string]: IBlockConfigItem
}

export interface IBlockConfigItem
{
	id: string;
	type: BlockType;
}
