
import externals from "lib/externals";

import SiteModel from "lib/gaia/core/SiteModel";
import ISitemap from "../../../../lib/gaia/interface/ISitemap";

export var sitemapMock:ISitemap = {
	"title": "Skeleton - Gaia - {page}",
	"routes": [
	],
	"config": {

	},
	"pages": <any[]>[
		{
			"id": "index",
			"title": "index",
			"landing": false,
			"pages": [
				{
					"id": "home",
					"title": "home",
					"controller": "default",
					"viewModel": "default",
					"template": "default"
				},
				{
					"id": "contact",
					"title": "contact",
					"controller": "default",
					"viewModel": "default",
					"template": "default"
				}


				// example of deeplinking with routes
				,
				{
					"id": "detail",
					"title": "detail",
					"controller": "default",
					"viewModel": "default",
					"template": "default"
				}

				// example of deeplinking with regex routes
				,
				{
					"id": "video",
					"title": "video",
					"controller": "default",
					"viewModel": "default",
					"template": "default"
				}
			]
		}
	],
	"popups": <any[]>[
		{
			"id": "popup1",
			"title": "popup1",
			"controller": "default",
			"viewModel": "default",
			"template": "default",
			"container": "index"
		}
		,
		{
			"id": "popup2",
			"title": "popup2",
			"controller": "default",
			"viewModel": "default",
			"template": "default",
			"container": "main"
		}
		,

		// deep popup example
		{
			"id": "takeover",
			"title": "takeover",
			"controller": "default",
			"viewModel": "default",
			"template": "default",
			"landing": false,
			"pages": [
				{
					"id": "about",
					"title": "about",
					"controller": "default",
					"viewModel": "default",
					"template": "default",
					"type": "popup"
				},
				{
					"id": "terms",
					"title": "terms",
					"controller": "default",
					"viewModel": "default",
					"template": "default",
					"type": "popup"
				}
			]
		}
	]
};

export function setupModel(sitemap:ISitemap = sitemapMock):SiteModel
{
	var model = new SiteModel();

	model.load(sitemap);

	return model;
}



