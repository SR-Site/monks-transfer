import StringUtils from 'lib/temple/util/type/StringUtils';

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('type', () =>
				describe('StringUtils', () =>
				{
					describe('replaceVars', () =>
					{
						it('It should replace the vars correct', () =>
						{
							expect(StringUtils.replaceVars('My name is {name} and I am from {country}',
								{name: 'John Do', country: 'the Netherlands'}))
								.toBe('My name is John Do and I am from the Netherlands');

							expect(StringUtils.replaceVars('My name is ${name} and I am from ${country}',
								{name: 'John Do', country: 'the Netherlands'}))
								.toBe('My name is John Do and I am from the Netherlands');

							expect(StringUtils.replaceVars('My name is {user.name} and I am from {user.country.name}',
								{user: {name: 'John Do', country: {name: 'the Netherlands'}}}))
								.toBe('My name is John Do and I am from the Netherlands');

							expect(StringUtils.replaceVars('My name is ${user.name} and I am from ${user.country.name}',
								{user: {name: 'John Do', country: {name: 'the Netherlands'}}}))
								.toBe('My name is John Do and I am from the Netherlands');
						});
					});
				})))));