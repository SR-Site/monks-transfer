
import externals from "lib/externals";
import polyfills from "lib/polyfill/polyfills";
polyfills;

import * as Gaia from "lib/gaia/api/Gaia";

import BranchTools from "lib/gaia/core/BranchTools";
import {sitemapMock, setupModel} from "test/lib/gaia/core/SiteModelMock";

setupModel();

describe('lib', () =>
	describe('gaia', () =>
		describe('core', () =>
			describe('BranchTools', () =>
			{
				it('should return the correct page', () =>
				{
					expect(BranchTools.getPage('').getBranch()).toEqual('index');
					expect(BranchTools.getPage('index').getBranch()).toEqual('index');
					expect(BranchTools.getPage('index/home').getBranch()).toEqual('index/home');
					expect(BranchTools.getPage('home').getBranch()).toEqual('index/home');
					expect(BranchTools.getPage('detail').getBranch()).toEqual('index/detail');
				});

				it('should return the correct validBranch', () =>
				{
					expect(BranchTools.getValidBranch('random-value')).toEqual('index/home');
					expect(BranchTools.getValidBranch('index')).toEqual('index/home');
					expect(BranchTools.getValidBranch('home')).toEqual('index/home');
					expect(BranchTools.getValidBranch('detail/deeplink/that/shoud/be/stripped')).toEqual('index/detail');

					expect(BranchTools.getValidBranch('random-value', false)).toEqual('index');
					expect(BranchTools.getValidBranch('index', false)).toEqual('index');
				});

				it('should return the correct fullBranch', () =>
				{
					expect(BranchTools.getFullBranch('')).toEqual('index/home');
					expect(BranchTools.getFullBranch('home')).toEqual('index/home');
					expect(BranchTools.getFullBranch('detail')).toEqual('index/detail');
				});

				it('should return a list of pages', () =>
				{
					var pagesIndex = BranchTools.getPagesOfBranch('');
					expect(pagesIndex.length).toEqual(2);
					expect(pagesIndex).toContain(BranchTools.getPage('index'));
					expect(pagesIndex).toContain(BranchTools.getPage('home'));

					var pagesHome = BranchTools.getPagesOfBranch('home');
					expect(pagesHome.length).toEqual(2);
					expect(pagesHome).toContain(BranchTools.getPage('index'));
					expect(pagesHome).toContain(BranchTools.getPage('home'));

					var pagesDetail = BranchTools.getPagesOfBranch('index/detail');
					expect(pagesDetail.length).toEqual(2);
					expect(pagesDetail).toContain(BranchTools.getPage('index'));
					expect(pagesDetail).toContain(BranchTools.getPage('detail'));
				});

				it('should return the default child branch', () =>
				{
					expect(BranchTools.getDefaultChildBranch('index')).toEqual('index/home');
					expect(BranchTools.getDefaultChildBranch('index/home')).toEqual('index/home');
					expect(BranchTools.getDefaultChildBranch('index/detail')).toEqual('index/detail');
				});

				it('should return the correct popup branch', () =>
				{
					expect(BranchTools.getPopupBranch('popup1', 'index')).toEqual('index/popup1');
					expect(BranchTools.getPopupBranch('popup1', 'index/home')).toEqual('index/home/popup1');
					expect(BranchTools.getPopupBranch('popup1', 'index/home/popup1')).toEqual('index/home/popup1');
					expect(BranchTools.getPopupBranch('popup1', 'index/home/popup2')).toEqual('index/home/popup1');
					expect(BranchTools.getPopupBranch('popup1', 'index/home/takeover')).toEqual('index/home/popup1');
					expect(BranchTools.getPopupBranch('popup1', 'index/home/takeover/about')).toEqual('index/home/popup1');

					expect(BranchTools.getPopupBranch('takeover/about', 'index/home')).toEqual('index/home/takeover/about');
					expect(BranchTools.getPopupBranch('takeover/about', 'index/home/popup1')).toEqual('index/home/takeover/about');
					expect(BranchTools.getPopupBranch('takeover/about', 'index/home/takeover')).toEqual('index/home/takeover/about');
					expect(BranchTools.getPopupBranch('takeover/about', 'index/home/takeover/about')).toEqual('index/home/takeover/about');

					expect(BranchTools.getPopupBranch('takeover', 'index/home/popup1')).toEqual('index/home/takeover');
					expect(BranchTools.getPopupBranch('takeover', 'index/home/takeover')).toEqual('index/home/takeover');
					expect(BranchTools.getPopupBranch('takeover', 'index/home/takeover/about')).toEqual('index/home/takeover');

					expect(BranchTools.getPopupBranch('takeover', 'index/home/deeplink')).toEqual('index/home/takeover');
					expect(BranchTools.getPopupBranch('takeover', 'index/home/takeover/deeplink')).toEqual('index/home/takeover');
					expect(BranchTools.getPopupBranch('takeover', 'index/home/takeover/about/deeplink')).toEqual('index/home/takeover');
				});
			}))));