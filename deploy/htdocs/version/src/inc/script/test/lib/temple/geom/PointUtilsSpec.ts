import PointUtils from "lib/temple/geom/PointUtils";

describe('lib', () =>
	describe('temple', () =>
		describe('geom', () =>
			describe('PointUtils', () =>
			{
				describe('distance', () =>
				{
					it('should be correct', () =>
					{
						expect(PointUtils.distance({x: 0, y: 0}, {x: 10, y: 0})).toEqual(10);
						expect(PointUtils.distance({x: 0, y: 0}, {x: 0, y: 10})).toEqual(10);
						expect(PointUtils.distance({x: 0, y: 0}, {x: 3, y: 4})).toEqual(5);
						expect(PointUtils.distance({x: 0, y: 0}, {x: 4, y: 3})).toEqual(5);
					});
				});

				describe('angle', () =>
				{
					it('should be correct', () =>
					{
						expect(PointUtils.angle({x: 0, y: 0}, {x: 10, y: 0})).toEqual(0);
						expect(PointUtils.angle({x: 0, y: 0}, {x: 10, y: 10})).toEqual(45);
						expect(PointUtils.angle({x: 0, y: 0}, {x: 0, y: 10})).toEqual(90);
						expect(PointUtils.angle({x: 0, y: 0}, {x: -10, y: 10})).toEqual(135);
						expect(PointUtils.angle({x: 0, y: 0}, {x: -10, y: 0})).toEqual(180);
						expect(PointUtils.angle({x: 0, y: 0}, {x: -10, y: -10})).toEqual(-135);
						expect(PointUtils.angle({x: 0, y: 0}, {x: 0, y: -10})).toEqual(-90);
						expect(PointUtils.angle({x: 0, y: 0}, {x: 10, y: -10})).toEqual(-45);
					});
				});

				describe('interpolate', () =>
				{
					it('should be correct', () =>
					{
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, 0)).toEqual({x: 0, y: 0});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .1)).toEqual({x: 1, y: 1});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .2)).toEqual({x: 2, y: 2});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .3)).toEqual({x: 3, y: 3});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .4)).toEqual({x: 4, y: 4});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .5)).toEqual({x: 5, y: 5});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .6)).toEqual({x: 6, y: 6});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .7)).toEqual({x: 7, y: 7});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .8)).toEqual({x: 8, y: 8});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, .9)).toEqual({x: 9, y: 9});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, 1)).toEqual({x: 10, y: 10});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, 2)).toEqual({x: 20, y: 20});
						expect(PointUtils.interpolate({x: 0, y: 0}, {x: 10, y: 10}, -1)).toEqual({x: -10, y: -10});
					});
				});
			}))));