import {Gender, Size} from "test/lib/temple/util/EnumeratorMock";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('Enumerator', () =>
			{
				it('should return the correct object', () =>
				{
					expect(Gender.get('m')).toEqual(Gender.MALE);
					expect(Gender.get('f')).toEqual(Gender.FEMALE);

					expect(Gender.getByLabel('Male')).toEqual(Gender.MALE);
					expect(Gender.getByLabel('Female')).toEqual(Gender.FEMALE);

					expect(Size.get('s')).toEqual(Size.SMALL);
					expect(Size.get('m')).toEqual(Size.MEDIUM);
					expect(Size.get('l')).toEqual(Size.LARGE);

					expect(Size.getByLabel('Small')).toEqual(Size.SMALL);
					expect(Size.getByLabel('Medium')).toEqual(Size.MEDIUM);
					expect(Size.getByLabel('Large')).toEqual(Size.LARGE);
				});

				it('should not allow you to create a new Enumerator with an existing id', () =>
				{
					expect(() => new Gender('m')).toThrow();
					expect(() => new Gender('x')).not.toThrow();
				});

				it('should use the id when converting to JSON', () =>
				{
					expect(JSON.stringify(Gender.MALE)).toEqual('"m"');
					expect(JSON.stringify(Size.MEDIUM)).toEqual('"m"');
				});

				it('should use the label when converting to string', () =>
				{
					expect(Gender.MALE + '').toEqual('Male');
					expect(Gender.MALE + 'X').toEqual('MaleX');
					expect(Gender.MALE.toString()).toEqual('Male');

					expect(Size.MEDIUM + '').toEqual('Medium');
					expect(Size.MEDIUM + 'X').toEqual('MediumX');
					expect(Size.MEDIUM.toString()).toEqual('Medium');
				});

				it('should check if the Enumerator value is available', () =>
				{
					expect(Gender.has('m')).toEqual(true);
					expect(Gender.has('f')).toEqual(true);
					expect(Gender.has('a')).toEqual(false);
					expect(Gender.has('b')).toEqual(false);
					expect(Gender.has('c')).toEqual(false);

					expect(Size.has('s')).toEqual(true);
					expect(Size.has('m')).toEqual(true);
					expect(Size.has('l')).toEqual(true);
					expect(Size.has('a')).toEqual(false);
					expect(Size.has('b')).toEqual(false);
					expect(Size.has('c')).toEqual(false);
				});


			}))));