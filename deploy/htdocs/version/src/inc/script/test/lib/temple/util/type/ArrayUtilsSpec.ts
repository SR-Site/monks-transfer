import externals from 'lib/externals';
import ArrayUtils from 'lib/temple/util/type/ArrayUtils';

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('type', () =>
				describe('ArrayUtils', () =>
				{
					describe('inArray', () =>
					{
						it('should return true when giving it an array of numbers', () => expect(ArrayUtils.inArray([1, 2, 3], 1)).toBe(true));
						it('work with arrays of objects and checking by reference', () =>
						{
							var data = [{id: 'item1'}, {id: 'item2'}, {id: 'item3'}];
							expect(ArrayUtils.inArray(data, data[0])).toBe(true)
						});
					});

					describe('average',
						() =>  it('Should calculate the correct average',
							() => expect(ArrayUtils.average([1, 0])).toBe(0.5)));

					describe('removeValueFromArray', () =>
					{
						it('should remove all occurring values from the array', () =>
						{
							var arr = [1, 2, 3, 4, 1, 2, 3, 4];

							var total = ArrayUtils.removeValueFromArray(arr, 1);

							expect(total).toBe(2);
							expect(arr[0]).toBe(2);
							expect(arr[1]).toBe(3);
							expect(arr[2]).toBe(4);
							expect(arr[3]).toBe(2);
							expect(arr[4]).toBe(3);
							expect(arr[5]).toBe(4);

						});
					});

					describe('removeValueFromArrayOnce', () =>
					{
						it('should remove the first occurring value from the array', () =>
						{
							var arr = [1, 2, 3, 4, 1, 2, 3, 4];

							ArrayUtils.removeValueFromArrayOnce(arr, 1);

							expect(arr.length).toBe(7);
							expect(arr[0]).toBe(2);
							expect(arr[1]).toBe(3);
							expect(arr[2]).toBe(4);
							expect(arr[3]).toBe(1);
							expect(arr[4]).toBe(2);
							expect(arr[5]).toBe(3);
							expect(arr[6]).toBe(4);
						});
					});

					describe('areEqual', () =>
					{
						it('should return true if the arrays are equal by reference', () =>
						{
							var arr = ['foo', 'bar'];
							expect(ArrayUtils.areEqual(arr, arr)).toBe(true);
						});

						it('should return true if the arrays are equal by dirty checking', () =>
						{
							var arr1 = ['foo', 'bar'];
							var arr2 = ['foo', 'bar'];
							expect(ArrayUtils.areEqual(arr1, arr2)).toBe(true);
						});

						it('should return false if the arrays are of unequal length', () =>
						{
							var arr1 = ['foo', 'bar'];
							var arr2 = ['foo'];
							expect(ArrayUtils.areEqual(arr1, arr2)).toBe(false);
						});

						it('should return false if the arrays are unequal by dirty checking', () =>
						{
							var arr1 = ['foo', 'bar'];
							var arr2 = ['foo', 'foo'];
							expect(ArrayUtils.areEqual(arr1, arr2)).toBe(false);
						});
					});

					describe('filledLength',
						() => it('should return the correct amount of non-null values in the array',
							() => expect(ArrayUtils.filledLength([null, 'foo', 'bar', null])).toBe(2)
						)
					);

					describe('getUniqueFirst',
						() => it('should return the correct amount of non-null values in the array',
							() => expect(ArrayUtils.getUniqueFirst(['foo', 'bar'], ['bar'])[0]).toBe('foo')
						)
					);

					describe('intersect',
						() => it('should return the items that are in both arrays',
							() => expect(ArrayUtils.intersect(['a', 'b'], ['b', 'c'])[0]).toBe('b')
						)
					);

					describe('addElement',
						() => it('should add the given items to the array',
							() => expect(
								ArrayUtils.addElements('a', 5, []).every((el) => el == 'a')
							).toBe(true)
						)
					);

					describe('removeEmptyElements',
						() => it('should remove the undefined and null elements from the array',
							() => expect(ArrayUtils.removeEmptyElements(['a', void 0, undefined, 'b', null, 'c', void 0]).join(',')).toBe('a,b,c')
						)
					);

					describe('concatAll',
						() => it('should flatten the list of arrays',
							() => expect(ArrayUtils.concatAll([['a', 'b'], ['c'], ['d']]).join(',')).toBe('a,b,c,d')
						)
					);
				})))));