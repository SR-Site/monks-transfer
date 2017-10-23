import Theme from 'data/enum/Theme';

class ThemeHelper {
	/**
	 * @public
	 * @method parse
	 * @param theme
	 * @returns {string}
	 */
	public static parse(theme: Theme): string {
		const themeLabel = Theme[theme];

		if (!themeLabel) {
			console.warn('[ThemeHelper] Unknown theme: ' + theme);
		}

		return themeLabel ? 'theme-' + themeLabel.toLowerCase() : '';
	}
}

export default ThemeHelper;
