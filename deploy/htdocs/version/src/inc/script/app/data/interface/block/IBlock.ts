interface IBlock
{
	id:string;
	type:string;
	data:any|Array<IBlock>;
}

export default IBlock;
