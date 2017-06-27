
class ValidationRules {

	public static emailRegex:RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
	public static nonEmpty:RegExp = /^.+$/;
	public static isValidPhone:RegExp = /^[\+]?(\d?){8,12}\d$/;

	public static isValidEmail(value:string, name:string):string
	{
		return  (<RegExp>ValidationRules.emailRegex).test(<string> value) ? '' : 'invalid_email';
	}

	public static isValidDate(value:string, name:string):string
	{
		return (moment(value).isValid() ? '' : 'invalid_date');
	}

	public static minAge(minAge:number):Function
	{
		return (value:string, name:string):string =>
		{
			return (moment().diff(moment(value), 'years') >= minAge ? '' : 'min_age');
		}
	}

	public static isValidNumber(value:string, name:string):string
	{
		return  (<RegExp>ValidationRules.isValidPhone).test(<string> value) ? '' : 'invalid_phone';
	}
}

export default ValidationRules;
