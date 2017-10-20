import { ButtonType } from 'vue-block-system';

const backendButtonType = {
	LINK: 0,
	ACTION: 1,
};

/**
 * Map the backend data to the block system data
 */
export const buttonTypeMap = {
	[backendButtonType.LINK]: ButtonType.LINK,
	[backendButtonType.ACTION]: ButtonType.ACTION,
};

export default backendButtonType;
