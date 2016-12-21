import ISitemap from "../interface/ISitemap";
import IPageAsset from "lib/gaia/interface/IPageAsset";
import Flow from "../flow/Flow";
import PageAsset from "lib/gaia/asset/PageAsset";
import IPageNode from "lib/gaia/interface/IPageNode";
import PageType from "../interface/PageType";

class SiteModel
{
	static _sitemap:ISitemap;
	static _tree:IPageAsset;
	static _title:string;
	static defaultFlow:Flow = Flow.NORMAL;
	static _history:boolean;
	static _indexFirst:boolean;
	static _indexID:string;
	static _version:number;

	public load(sitemap:ISitemap):void
	{
		SiteModel._sitemap = sitemap;

		if (SiteModel._sitemap.config)
		{
			if (SiteModel._sitemap.config.controllerPath)
			{
				PageAsset.controllerPath = SiteModel._sitemap.config.controllerPath;
			}
			if (SiteModel._sitemap.config.viewModelPath)
			{
				PageAsset.viewModelPath = SiteModel._sitemap.config.viewModelPath;
			}
			if (SiteModel._sitemap.config.templatePath)
			{
				PageAsset.templatePath = SiteModel._sitemap.config.templatePath;
			}
		}
		this.parseSite();
		this.parseTree();
	}

	public static getSitemap():ISitemap
	{
		return SiteModel._sitemap;
	}

	public static getTree():IPageAsset
	{
		return SiteModel._tree;
	}

	public static getTitle():string
	{
		return SiteModel._title;
	}

	public static getIndexFirst():boolean
	{
		return SiteModel._indexFirst;
	}

	public static getIndexID():string
	{
		return SiteModel._indexID;
	}

	public static getVersion():string
	{
		return SiteModel._version.toString();
	}

	private parseSite():void
	{
		SiteModel._title = SiteModel._sitemap.title || "";
		SiteModel._history = !(SiteModel._sitemap.history == false);
		SiteModel._indexFirst = (SiteModel._sitemap.indexFirst == true);
		SiteModel._version = SiteModel._sitemap.version;// || FlashVars.getValue("version");
	}

	private parsePopupPage(page:IPageNode, node:IPageNode):void
	{
		if (page.pages)
		{
			for (var j = 0; j < page.pages.length; ++j)
			{
				this.parsePopupPage(page.pages[j], node);
			}
		}
	}

	private getPages(page:any)
	{
		var pages:Array<IPageNode> = [];
		if (page.pages)
		{
			for (var i:number = 0; i < page.pages.length; ++i)
			{
				pages.push(page.pages[i]);
				pages = pages.concat(this.getPages(page.pages[i]));
			}
		}

		return pages;
	}

	private parseTree():void
	{
		var node:IPageNode = SiteModel._sitemap.pages[0];
		if (node.id != undefined)
		{
			SiteModel._indexID = node.id;
		}

		var popupString = '[]';

		if (typeof SiteModel._sitemap.popups !== 'undefined')
		{
			for (var i = 0; i < SiteModel._sitemap.popups.length; i++)
			{
				var popup = SiteModel._sitemap.popups[i];
				popup.type = PageType.POPUP;
			}
			popupString = JSON.stringify(SiteModel._sitemap.popups);
		}

		SiteModel._tree = this.parsePage(node, null, popupString);
	}

	private parseChildren(parent:IPageAsset, childNodes:Array<IPageNode>, popupString:string = null):any
	{
		var children:Object = {};
		var len:number = childNodes.length;
		for (var i:number = 0; i < len; i++)
		{
			var node:any = childNodes[i];
			var page:IPageAsset = this.parsePage(node, parent, popupString);
			children[page.id] = page;
		}
		return children;
	}

	private parsePage(node:IPageNode, parent:IPageAsset = null, popupString:string = null):IPageAsset
	{
		SiteModel.validateNode(node, true);

		var isIndex:boolean = (node.id == SiteModel._indexID);

		// merge popups from this page
		if (node.popups)
		{
			for (var i = 0; i < node.popups.length; i++)
			{
				var popup = node.popups[i];
				popup.type = PageType.POPUP;
			}
			popupString = JSON.stringify(JSON.parse(popupString).concat(node.popups));
		}

		if (!isIndex)
		{
			if (node.type == PageType.POPUP || parent.type == PageType.POPUP)
			{
				node.type = PageType.POPUP;
			}
		}

		// add popup pages to node
		if (node.type != PageType.POPUP && (node.landing || !node.pages || node.pages.length == 0))
		{
			if (!node.pages)
			{
				node.pages = [];
			}

			var copy:Array<IPageNode> = JSON.parse(popupString);
			for (var j = 0; j < copy.length; ++j)
			{
				this.parsePopupPage(copy[j], node);
			}
			node.pages = node.pages.concat(copy);
			node.landing = true;
		}

		var page:IPageAsset = new PageAsset(node);

		if (!isIndex)
		{
			page.parent = parent;
		}

		page.data = node.data;
		page.type = node.type || PageType.PAGE;

		// child pages
		if (node.pages && node.pages.length > 0)
		{
			page.defaultChild = node.defaultChild;
			page.pages = this.parseChildren(page, node.pages, popupString);
			if (!page.pages[page.defaultChild])
			{
				page.defaultChild = node.pages[0].id;
			}
		}
		// terminal page
		else
		{
			page.landing = true;
		}

		return page;
	}

	// Site XML Validation
	public static validateNode(node:IPageNode, isPage:boolean = false):void
	{
		var error:string = "*Invalid Site XML* " + (isPage ? "Page " : "Asset ");
		if (node.id == undefined)
		{
			throw new Error(error + "node missing required attribute 'id'");
		}
	}
}

export default SiteModel;