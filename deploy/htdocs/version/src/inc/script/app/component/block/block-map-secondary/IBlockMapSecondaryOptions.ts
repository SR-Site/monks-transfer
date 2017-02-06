import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";

interface IBlockMapSecondaryOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The heading displayed on the secondary map
	 */
	heading: string;
	/**
	 * @property
	 * @description The sub heading displayed on the secondary map
	 */
	subHeading: string;
	/**
	 * @property
	 * @description The paragraph displayed on the secondary map
	 */
	paragraph: string;
}

export default IBlockMapSecondaryOptions;
