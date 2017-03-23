import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockFilterContentController from 'app/component/block/block-filter-content/BlockFilterContentController';
import IBlockFilterContentOptions from 'app/component/block/block-filter-content/IBlockFilterContentOptions';

import ko = require('knockout');
import IBlock from "../../../data/interface/block/IBlock";
import BlockType from "../../../data/enum/type/BlockType";
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";

class BlockFilterContentViewModel extends AbstractBlockComponentViewModel<BlockFilterContentController, IBlockFilterContentOptions>
{
	public BlockType:Enum = BlockType;

	public items:KnockoutObservableArray<IBlock> = ko.observableArray([]);
	public activePageIndex:KnockoutObservable<number> = ko.observable(0);
	public totalPages:KnockoutObservableArray<number> = ko.observableArray([]);
	public limit:number = 4;
	public offset: number = 0;

	/**
	 *  KnockoutObersvableArray pages
	 *  @description Store loaded items in pages and memory, to avoid duplicate request.
	 */
	public pages:KnockoutObservableArray<{items:Array<IBlock>;pageIndex:number;}> = ko.observableArray([]);

	/**
	 *  KnockoutComputed showInPages
	 *  @description Determines wether we want to show the items in pages or not (based on deviceState)
	 */
	public showInPages:KnockoutComputed<boolean> = ko.computed(() =>{
		return DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL
	});

	/**
	 *  KnockoutComputed visibleItems
	 *  @description for desktop we want to show in it pages, on mobile we want to load all items underneath eachother
	 */
	public visibleItems:KnockoutComputed<Array<IBlock>> = ko.computed(() =>{
		let items = [];

		if(this.showInPages()) {
			let pageFound = this.pages().find((page) => page.pageIndex == this.activePageIndex());

			if(pageFound) {
				items = pageFound.items;
			}
		}
		else {
			items = this.items();
		}

		return items;
	});


	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		this.BlockType = null;
		this.items = null;

		this.offset = null;
		this.limit = null;

		// always call this last
		super.destruct();
	}
}

export default BlockFilterContentViewModel;
