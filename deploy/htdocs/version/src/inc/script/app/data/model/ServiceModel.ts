import ContentService from "../service/ContentService";
import UserService from "../service/UserService";

/**
 * @class ServiceModel
 * @description Class that groups all the services used in the app
 */
class ServiceModel
{
	public contentService: ContentService;
	public userService: UserService;
}

export default ServiceModel;
