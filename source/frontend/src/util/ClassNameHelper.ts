import Theme from 'data/enum/Theme';
import Alignment from 'data/enum/Alignment';
import PersonaType from 'data/enum/PersonaType';
import Orientation from 'data/enum/Orientation';
import Size from 'data/enum/Size';

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
			console.warn('[ClassNameHelper] Unknown persona type: ' + personaType);
		}

		return personaLabel ? personaLabel.toLowerCase() : '';
	}

	/**
	 * @public
	 * @Method parseOrientation
	 * @param {Orientation} orientation
	 * @returns {string}
	 */
	public static parseOrientation(orientation: Orientation): string {
		const orientationLabel = Orientation[orientation];

		if (!orientationLabel) {
			console.warn('[ClassNameHelper] Unknown orientation type: ' + orientation);
		}

		return orientationLabel ? orientationLabel.toLowerCase() : '';
	}

	/**
	 * @public
	 * @Method parseSize
	 * @param {Size} size
	 * @returns {string}
	 */
	public static parseSize(size: Size): string {
		const sizeLabel = Size[size];

		if (!sizeLabel) {
			console.warn('[ClassNameHelper] Unknown orientation size: ' + size);
		}

		return sizeLabel ? sizeLabel.toLowerCase() : '';

	}
}

export default ClassNameHelper;
