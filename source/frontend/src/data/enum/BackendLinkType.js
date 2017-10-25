import { LinkType } from 'vue-block-system';

const backendLinkType = {
	INTERNAL: 0,
	EXTERNAL: 1,
	SCROLL_TO_NEXT_BLOCK: 2,
	CONTACT_US: 3,
	EXTERNAL_BLANK: 4,
};

/**
 * Map the backend data to the block system data
 */
export const linkTypeMap = {
	[backendLinkType.INTERNAL]: LinkType.INTERNAL,
	[backendLinkType.EXTERNAL]: LinkType.EXTERNAL,
	[backendLinkType.EXTERNAL_BLANK]: LinkType.EXTERNAL_BLANK,
	[backendLinkType.SCROLL_TO_NEXT_BLOCK]: LinkType.SCROLL_TO_NEXT_BLOCK,
	// Custom events for this project so map to it self
	[backendLinkType.CONTACT_US]: backendLinkType.CONTACT_US,
};

export default backendLinkType;
