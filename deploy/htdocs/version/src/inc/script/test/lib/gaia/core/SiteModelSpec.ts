
import externals from "lib/externals";
import polyfills from "lib/polyfill/polyfills";
polyfills;

import * as Gaia from "lib/gaia/api/Gaia";

import BranchTools from "lib/gaia/core/BranchTools";
import SiteModel from "lib/gaia/core/SiteModel";
import PageAsset from "lib/gaia/asset/PageAsset";

import GaiaRouter from "lib/gaia/router/GaiaRouter";
import {sitemapMock, setupModel} from "test/lib/gaia/core/SiteModelMock";

describe('lib', () =>
	describe('gaia', () =>
		describe('core', () =>
			describe('SiteModel', () =>
			{
				it('should return the sitemodel', () =>
				{
					expect(SiteModel.getSitemap()).toEqual(sitemapMock);
				});

				it('should return the correct title', () =>
				{
					expect(SiteModel.getTitle()).toBe("Skeleton - Gaia - {page}");
				});

				it('should return the base tree', () =>
				{
					expect(SiteModel.getTree()).toEqual(jasmine.any(PageAsset));
				});
			}))));