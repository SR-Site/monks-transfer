import {IBlockConfig} from "../data/interface/block/IBlockConfig";
import Blocks from "../data/enum/block/Blocks";
import BlockType from "../data/enum/type/BlockType";

/**
 * @description this onfiguration file is used to map the backend block name to the client block name,
 * it also defines the type of the block to be a component or a partial
 *
 * Example usage:
 *
 * externalBlockId: {
 *     id: Blocks.INTERNAL_BLOCK_ID,
 *     type: BlockType.COMPONENT
 * }
 */
export const blockConfig:IBlockConfig = {
	heroMain: {
		id: Blocks.HERO_MAIN,
		type: BlockType.COMPONENT
	},
	imageWithContent: {
		id: Blocks.IMAGE_WITH_CONTENT,
		type: BlockType.COMPONENT
	},
	smallInfo: {
		id: Blocks.SMALL_INFO,
		type: BlockType.COMPONENT
	},
	map: {
		id: Blocks.MAP,
		type: BlockType.COMPONENT
	},
	imageCallToActions: {
		id: Blocks.IMAGE_CALL_TO_ACTIONS,
		type: BlockType.COMPONENT
	}
};
