export const mediaQueries = {
	// Really small mobile devices
	X_SMALL: '(max-width: 480px)',
	// mobile devices
	SMALL: '(max-width: 767px)',
	// Tablets portrait
	MEDIUM: '(max-width: 1023px)',
	// Tablets landscape
	LARGE: '(max-width: 1280px)',
	// Normal desktop
	X_LARGE: '(max-width: 1439px)',
	// Large desktop
	XX_LARGE: '(max-width: 1659px)',
	// Extra large desktop
	XXX_LARGE: '(min-width: 1660px)',

	MEDIUM_ISOLATE: '(min-width: 768px) and (max-width: 1023px)',

	// Exception for the article teaser blocks
	ARTICLE_TEASER_MEDIUM: '(max-width: 1010px)',

	ARTICLE_TEASER_LARGE: '(max-width: 1225px)',
};

export const DeviceState = {
	X_SMALL: 0,
	SMALL: 1,
	MEDIUM: 2,
	LARGE: 3,
	X_LARGE: 4,
	XX_LARGE: 5,
	XXX_LARGE: 6,
	MEDIUM_ISOLATE: 7,
};
