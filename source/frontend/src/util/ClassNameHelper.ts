import Theme from 'data/enum/Theme';
import Alignment from 'data/enum/Alignment';
import PersonaType from 'data/enum/PersonaType';

class ClassNameHelper {
	/**
	 * @public
	 * @method parseTheme
	 * @param theme
	 * @returns {string}
	 */
	public static parseTheme(theme: Theme): string {
		const themeLabel = Theme[theme];

		if (!themeLabel) {
			console.warn('[ClassNameHelper] Unknown theme: ' + theme);
		}

		return themeLabel ? 'theme-' + themeLabel.toLowerCase() : '';
	}

	/**
	 * @public
	 * @method parseAlignment
	 * @param {Alignment} alignment
	 * @returns {string}
	 */
	public static parseAlignment(alignment: Alignment): string {
		const alignmentLabel = Alignment[alignment];

		if (!alignmentLabel) {
			console.warn('[ClassNameHelper] Unknown theme: ' + alignment);
		}

		return alignmentLabel ? 'alignment-' + alignmentLabel.toLowerCase() : '';
	}

	/**
	 * @Public
	 * @method parsePersonaType
	 * @param {PersonaType} personaType
	 * @returns {string}
	 */
	public static parsePersonaType(personaType: PersonaType): string {
		const personaLabel = PersonaType[personaType];

		if (!personaLabel) {
			console.warn('[ClassNameHelper] Unknown persona type: ' + personaLabel);
		}

		return personaLabel ? personaLabel.toLowerCase() : '';

	}
}

export default ClassNameHelper;
