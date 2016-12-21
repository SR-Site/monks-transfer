import Enumerator from "lib/temple/util/Enumerator";

export class Gender extends Enumerator
{
	public static MALE:Gender = new Gender('m', 'Male');
	public static FEMALE:Gender = new Gender('f', 'Female');
}

export class Size extends Enumerator
{
	public static SMALL:Size = new Size('s', 'Small');
	public static MEDIUM:Size = new Size('m', 'Medium');
	public static LARGE:Size = new Size('l', 'Large');
}