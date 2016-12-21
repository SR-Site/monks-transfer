import DefaultPageViewModel from "./DefaultPageViewModel";
import IBlock from "../data/interface/block/IBlock";
import BlockType from "../data/enum/type/BlockType";
import DefaultContentPageController from "./DefaultContentPageController";
import DefaultComponentController from "../component/block/DefaultComponentController";

/**
 * @class DefaultContentPageViewModel
 * @description his class should be extended by pages that use the block system to generate the page layout.
 */
abstract class DefaultContentPageViewModel<T extends DefaultContentPageController<any>> extends DefaultPageViewModel<T>
{
	/**
	 * @property BlockType
	 * @type {BlockType}
	 */
	public BlockType:Enum = BlockType;
	/**
	 * @property pageLayout
	 * @type {KnockoutObservableArray<IBlock>}
	 */
	public pageLayout:KnockoutObservableArray<IBlock> = ko.observableArray([]);
	/**
	 * @property activeBlock
	 * @type {KnockoutObservable<T>}
	 */
	public activeBlock:KnockoutObservable<DefaultComponentController<any, any>> = ko.observable(null);

	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		this.activeBlock = null;
		this.pageLayout = null;
		this.BlockType = null;

		super.destruct();
	}
}

export default DefaultContentPageViewModel;
