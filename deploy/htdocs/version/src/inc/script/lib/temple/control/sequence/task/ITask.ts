import EventDispatcher from "lib/temple/event/EventDispatcher";

interface ITask extends EventDispatcher
{
    progress:number;
    total:number;

	execute():void;
}

export default ITask;