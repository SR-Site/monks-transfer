import notification, { SHOW, SHOW_SERVER_ERROR } from './notification';

export const NotificationNamespace = 'notification';

export const NotificationMutationTypes = {
	SHOW: `${NotificationNamespace}/${SHOW}`,
	SHOW_SERVER_ERROR: `${NotificationNamespace}/${SHOW_SERVER_ERROR}`,
};

export default notification;
