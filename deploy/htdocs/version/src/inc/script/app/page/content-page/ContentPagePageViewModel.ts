import ContentPagePageController from "app/page/content-page/ContentPagePageController";
import IBlock from "../../data/interface/block/IBlock";
import AbstractBlockComponentController from "../../component/block/AbstractBlockComponentController";
import BlockType from "../../data/enum/type/BlockType";
import DefaultPageViewModel from "../DefaultPageViewModel";
import ko = require('knockout');

class ContentPagePageViewModel extends DefaultPageViewModel<ContentPagePageController>
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
	public activeBlock:KnockoutObservable<AbstractBlockComponentController<any, any>> = ko.observable(null);

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

export default ContentPagePageViewModel;