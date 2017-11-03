import { LinkType } from 'vue-block-system';
import BackendLinkType from './BackendLinkType';

export default {
	[BackendLinkType.INTERNAL]: LinkType.INTERNAL,
	[BackendLinkType.EXTERNAL]: LinkType.EXTERNAL,
	[BackendLinkType.EXTERNAL_BLANK]: LinkType.EXTERNAL_BLANK,
	[BackendLinkType.SCROLL_TO_NEXT_BLOCK]: LinkType.SCROLL_TO_NEXT_BLOCK,
	// Custom events for this project so map to it self
	[BackendLinkType.CONTACT_US]: BackendLinkType.CONTACT_US,
	[BackendLinkType.CONTACT_KERNEL]: BackendLinkType.CONTACT_KERNEL,
};
