/**
 * Flag
 *
 * A bitwise FlagMachine
 *
 * create a enum
 *
 * enum PizzaIngredients {
 *  BREAD = 1 << 0,
 *  CHEESE = 1 << 1,
 *  TOMATO = 1 << 2,
 *  UNIONS = 1 << 3,
 *  GARLIC = 1 << 4,
 * }
 *
 * var PizzaMozzarella = PizzaIngredients.BREAD | PizzaIngredients.TOMATO | PizzaIngredients.CHEESE;
 * var GarlicBread = PizzaIngredients.BREAD | PizzaIngredients.GARLIC;
 *
 * var pizza = new Flag<PizzaIngredients>();
 * pizza.add( PizzaIngredients.BREAD | PizzaIngredients.TOMATO | PizzaIngredients.CHEESE );
 *
 * pizza.equals(PizzaMozzarella); // true
 * pizza.contains(GarlicBread); // true
 * pizza.add(GarlicBread); // true
 * pizza.equals(PizzaMozzarella); // false because contains no garlic
 *
 * @module Temple
 * @namespace temple.util
 * @class Flag
 * @author Mient-jan Stelling <mient-jan@mediamonks.com>
 */
class Flag<T>
{
	protected _value:number;

	constructor(value:number|T|Flag<T> = 0)
	{
		this._value = 0 + <number> value;
	}

	/**
	 * @method contains
	 * @param value
	 * @returns {boolean}
	 */
	public contains(value:number|T|Flag<T>):boolean
	{
		var n = 0 + <number> value;
		return (this._value & n) === n;
	}

	/**
	 * @method add
	 * @param value
	 * @returns {boolean}
	 */
	public add(value:number|T|Flag<T>):void
	{
		var n = 0 + <number> value;
		this._value |= n;
	}

	/**
	 * @method remove
	 * @param value
	 * @returns {boolean}
	 */
	public remove(value:number|T|Flag<T>):void
	{
		var n = 0 + <number> value;
		this._value = (this._value ^ n) & this._value;
	}

	/**
	 * Compares the value of the Flag with the given value
	 *
	 * @method equals
	 * @param value
	 * @returns {boolean}
	 */
	public equals(value:number|T|Flag<T>):boolean
	{
		var n = 0 + <number> value;

		// adding n + 0 because this triggers valueOf on a Object when Flag class is given
		return this._value === n;
	}

	/**
	 * Returns a new Flag with the diff between the two flags
	 *
	 * Flags without
	 *
	 * @method intersection
	 * @param value
	 * @returns {boolean}
	 */
	public diff(value:number|T|Flag<T>):Flag<T>
	{
		var n = 0 + <number> value;

		// adding n + 0 because this triggers valueOf on a Object when Flag class is given
		return new Flag<T>(this._value ^ n);
	}


	/**
	 * Returns a new Flag with the intersection between the two flags
	 *
	 * @method intersection
	 * @param value
	 * @returns {boolean}
	 */
	public intersection(value:number|T|Flag<T>):Flag<T>
	{
		var n = 0 + <number> value;

		// adding n + 0 because this triggers valueOf on a Object when Flag class is given
		return new Flag<T>(this._value & n);
	}

	/**
	 * Returns the number value of the class
	 *
	 * @method valueOf
	 * @returns {number}
	 */
	public valueOf():number
	{
		return this._value;
	}

	/**
	 * Converts Flag to a string
	 *
	 * @method toString
	 * @param value
	 * @returns {string}
	 */
	public toString(value:number):string
	{
		return this._value.toString(value);
	}
}

export default Flag;