import Cookie from 'lib/temple/util/Cookie';

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('Cookie', () =>
			{
				let cookieName = 'some_cookie';
				let cookieValue = 'foo';

				beforeEach(function()
				{
					Cookie.remove(cookieName);
				});

				describe('remove', () => {
					beforeEach(function()
					{
						Cookie.set(cookieName, cookieValue);
						Cookie.remove(cookieName);
					});

					it('should return undefined after the cookie has been removed', () =>
						expect(Cookie.get(cookieName)).toBeUndefined());
				});

				describe('get/set', () =>
				{
					describe('with string value', () =>
					{
						beforeEach(function()
						{
							Cookie.set(cookieName, cookieValue);
						});

						it('should return undefined when cookie has not been set', () =>
							expect(Cookie.get(cookieName)).not.toBeUndefined());

						it('should return return the original string value when cookie has been set', () =>
							expect(Cookie.get(cookieName)).toBe(cookieValue));

						it('should update the cookie with a new value', () =>
						{
							Cookie.set(cookieName, 'bar');
							expect(Cookie.get(cookieName)).toBe('bar');
						});
					});

					describe('with object value', () =>
					{
						beforeEach(function()
						{
							let obj = {foo: cookieValue};
							Cookie.set(cookieName, obj, {json: true});
						});

						it('should not return an undefined object', () =>
							expect(Cookie.get(cookieName, {json: true})).not.toBeUndefined());

						it('should return an object with the same key/values', () => {
							expect(Cookie.get(cookieName, {json: true}).foo).toBe(cookieValue);
							expect(Cookie.get(cookieName, {json: true}).foo).not.toBeUndefined();
						});
					});
				});
			}))));