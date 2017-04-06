/**
 * @description This file should contain all the names of the blocks, they are used to map the backend blockname to the
 * client blockname
 */
class PanelBlocks
{
	public static CONTACT: string = 'Contact';

	/**
	 * @description labels for GA tracking
	 * @type {{}}
	 */
	public static ANALYTICS_LABEL:{[index:string]:string} = {
		[PanelBlocks.CONTACT]: 'StartAdvertising'
	};
}

export default PanelBlocks;
