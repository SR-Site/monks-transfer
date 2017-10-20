import { LinkType } from 'vue-block-system';

const backendLinkType = {
	INTERNAL: 0,
	EXTERNAL: 1,
	EXTERNAL_BLANK: 2,
};

/**
 * Map the backend data to the block system data
 */
export const linkTypeMap = {
	[backendLinkType.INTERNAL]: LinkType.INTERNAL,
	[backendLinkType.EXTERNAL]: LinkType.EXTERNAL,
	[backendLinkType.EXTERNAL_BLANK]: LinkType.EXTERNAL_BLANK,
};

export default backendLinkType;
