import Theme from "../data/enum/style/Theme";
class ThemeHelper
{
	/**
	 * @public
	 * @method getTheme
	 * @param theme
	 * @returns {string}
	 */
	public static getTheme(theme: Theme): string
	{
		const themeLabel = Theme[theme];

		if(!themeLabel) console.warn('[ThemeHelper] Unknown theme: ' + theme);

		return themeLabel ? 'theme-' + themeLabel.toLowerCase() : '';
	}
}

export default ThemeHelper;