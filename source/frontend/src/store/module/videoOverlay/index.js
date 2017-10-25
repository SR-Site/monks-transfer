import videoOverlay, { SHOW } from './videoOverlay';

export const VideoOverlayNamespace = 'videoOverlay';

export const VideoOverlayMutationTypes = {
	SHOW: `${VideoOverlayNamespace}/${SHOW}`,
};

export default videoOverlay;
