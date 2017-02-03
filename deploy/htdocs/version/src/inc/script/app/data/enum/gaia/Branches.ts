/**
 * @namespace app.data.enum
 * @class Branches
 */
class Branches
{
	public static INDEX:string = 'index';
	public static CONTENT_PAGE:string = 'index/content-page';
	public static POPUP_FULL_TOUR:string = 'index/content-page';
}

// use in templates
window['Branches'] = Branches;

// use in classes
export default Branches;