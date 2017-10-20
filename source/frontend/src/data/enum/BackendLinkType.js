import { LinkType } from 'vue-block-system';

const backendLinkType = {
	INTERNAL: 0,
	EXTERNAL: 1,
	SCROLL_TO_NEXT_SECTION: 2,
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
	[backendLinkType.CONTACT_US]: LinkType.EXTERNAL_BLANK, // TODO: fix this
	[backendLinkType.SCROLL_TO_NEXT_SECTION]: LinkType.EXTERNAL_BLANK, // TODO fix this!
};

export default backendLinkType;
