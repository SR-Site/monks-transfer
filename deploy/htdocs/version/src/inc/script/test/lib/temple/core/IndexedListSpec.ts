import IndexedList from "lib/temple/core/IndexedList";
import IIndexable from "../../../../lib/temple/core/IIndexable";

let indexedList:IndexedList<IIndexable>;
let item1:IIndexable;
let item2:IIndexable;
let item3:IIndexable;
let itemX:IIndexable;

describe('lib', () =>
	describe('temple', () =>
		describe('core', () =>
			describe('IndexedList', () =>
			{
				beforeEach(function()
				{
					item1 = {id: '1'};
					item2 = {id: '2'};
					item3 = {id: '3'};
					itemX = {id: 'x'};
					indexedList = new IndexedList([item1, item2, item3, {id: '4'}, {id: '5'}]);
				});

				it('should return the correct item', () =>
				{
					expect(indexedList.get('1')).toBe(item1);
					expect(indexedList.get('2')).toBe(item2);
					expect(indexedList.get('3')).toBe(item3);
				});

				it('should return the correct value', () =>
				{
					expect(indexedList.has('1')).toBe(true);
					expect(indexedList.has('2')).toBe(true);
					expect(indexedList.has('3')).toBe(true);
					expect(indexedList.has('4')).toBe(true);
					expect(indexedList.has('5')).toBe(true);
					expect(indexedList.has('6')).toBe(false);
				});

				it('should throw an error', () =>
				{
					expect(() => indexedList.get('6')).toThrow();
					expect(() => indexedList.get('3')).not.toThrow();
					expect(() => indexedList.delete({id: '5'})).toThrow();
					expect(() => indexedList.delete(item2)).not.toThrow();
					expect(() => indexedList.add({id: '1'})).toThrow();
					expect(() => indexedList.addList([{id: '1'}])).toThrow();
				});

				it('should add the item', () =>
				{
					expect(indexedList.has('x')).toBe(false);
					expect(indexedList.getAll().length).toBe(5);
					expect(indexedList.add(itemX)).toBe(void 0);
					expect(indexedList.has('x')).toBe(true);
					expect(indexedList.get('x')).toBe(itemX);
					expect(indexedList.getAll().length).toBe(6);
				});

				it('should remove the item', () =>
				{
					expect(indexedList.has('2')).toBe(true);
					expect(indexedList.delete(item2)).toBe(void 0);
					expect(indexedList.has('2')).toBe(false);
					expect(() => indexedList.get('2')).toThrow();
				});

				it('should remove all item', () =>
				{
					expect(indexedList.clear()).toBe(void 0);
					expect(indexedList.has('2')).toBe(false);
					expect(indexedList.getAll().length).toBe(0);
					expect(() => indexedList.get('2')).toThrow();
				});

				it('should add all items in the list', () =>
				{
					expect(indexedList.addList([{id: '6'}, {id: '7'}, {id: '8'}])).toBe(void 0);
					expect(indexedList.getAll().length).toBe(8);
					expect(indexedList.get('7').id).toBe('7');
				});

				it('should call a method on all items of the list', () =>
				{
					expect((() =>
					{
						var ids:string = '';
						indexedList.forEach((item:IIndexable) =>
						{
							ids += item.id;
						});
						return ids;
					})()).toBe('12345')
				});
			}))));