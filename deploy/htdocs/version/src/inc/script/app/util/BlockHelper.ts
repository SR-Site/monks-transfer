import IBlock from "../data/interface/block/IBlock";
import {IBlockConfig} from "../data/interface/block/IBlockConfig";
import {blockConfig} from "../config/blockConfig";

/**
 * @class BlockHelper
 * @description A simple class that contains methods that are used for handling the blocks in the application
 */
class BlockHelper
{
	public static availableBlocks:IBlockConfig = blockConfig;

	/**
	 * @public
	 * @method parsedBlocks
	 * @param {Array<IBlock>}parsedBlocks - All the blocks that are already parsed
	 * @param {Array<IBlock>}blocks - All the new blocks that still need to be parsed
	 * @param {boolean} recursive - Flag if we want to re-run the method recursively
	 * @description A simple method that parses an array of blocks as provided by the API and converts them to something
	 * the application understands. It also filters out unsupported blocks
	 */
	public static parseBlocks(parsedBlocks:Array<IBlock>, blocks:Array<IBlock>, recursive:boolean = false):Array<IBlock>
	{
		// Loop through the blocks
		blocks.forEach((block, index)=>
		{
			if(BlockHelper.isValidBlock(block.id))
			{
				// Store the id
				block.data.id = BlockHelper.availableBlocks[block.id].id;

				var clone = JSON.parse(JSON.stringify(block));

				// Merge the 2 object and store them in the blocks array
				parsedBlocks.push(Object.assign(clone, BlockHelper.availableBlocks[block.id]));

				if(block.data.blocks !== void 0)
				{
					var lastBlock = parsedBlocks[parsedBlocks.length - 1];
					lastBlock.data.blocks = [];

					BlockHelper.parseBlocks(lastBlock.data.blocks, block.data.blocks, true);
				}
			}
		});

		if(!recursive)
		{
			return parsedBlocks;
		}

	}

	/**
	 * @private
	 * @method isValidBlock
	 * @description check if a block is valid and exists in the section map
	 * @param {string} id
	 * @returns {boolean}
	 */
	public static isValidBlock(id:string):boolean
	{
		if(BlockHelper.availableBlocks[id] !== void 0)
		{
			return true;
		}
		else
		{
			console.warn('[PageLayoutModel] Trying to add a invalid block (' + id + '), add it to the BlockConfig.ts first');
			return false;
		}
	}
}

export default BlockHelper;
