import ISpritesheet = require('./ISpritesheet');

interface ICinematic
{
	stop:boolean;
	frames:ISpritesheet;
	loop:boolean;
	x:number;
	y:number;
}

export = ICinematic;

