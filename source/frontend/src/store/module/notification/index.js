import notification, { SHOW } from './notification';

export const NotificationNamespace = 'notification';

export const NotificationMutationTypes = {
	SHOW: `${NotificationNamespace}/${SHOW}`,
};

export default notification;
