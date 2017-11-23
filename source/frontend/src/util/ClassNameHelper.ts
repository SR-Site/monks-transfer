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

		if (themeLabel !== undefined) {
			return `theme-${themeLabel.toLowerCase()}`;
		}

		return '';
	}

	/**
	 * @public
	 * @method parseAlignment
	 * @param {Alignment} alignment
	 * @returns {string}
	 */
	public static parseAlignment(alignment: Alignment): string {
		const alignmentLabel = Alignment[alignment];

		if (alignmentLabel !== undefined) {
			return `alignment-${alignmentLabel.toLowerCase()}`;
		}

		return '';
	}

	/**
	 * @Public
	 * @method parsePersonaType
	 * @param {PersonaType} personaType
	 * @returns {string}
	 */
	public static parsePersonaType(personaType: PersonaType): string {
		const personaLabel = PersonaType[personaType];

		if (personaLabel !== undefined) {
			return personaLabel.toLowerCase();
		}

		return '';
	}

	/**
	 * @public
	 * @Method parseOrientation
	 * @param {Orientation} orientation
	 * @returns {string}
	 */
	public static parseOrientation(orientation: Orientation): string {
		const orientationLabel = Orientation[orientation];

		if (orientationLabel !== undefined) {
			return orientationLabel.toLowerCase();
		}

		return '';
	}

	/**
	 * @public
	 * @Method parseSize
	 * @param {Size} size
	 * @returns {string}
	 */
	public static parseSize(size: Size): string {
		const sizeLabel = Size[size];

		if (sizeLabel !== undefined) {
			return sizeLabel.toLowerCase();
		}

		return '';
	}
}

export default ClassNameHelper;
