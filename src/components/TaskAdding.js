import React, {useState, useContext} from 'react';
import TasksContext from '../context/index';

export default function TaskAdding (){

    const [taskName, SetTaskName] = useState("");
    const [taskDescription, SetTaskDescription] = useState("");
    const [taskLevel, SetTaskLevel] = useState(1);

    const {dispatch} = useContext(TasksContext);

    const HandleSubmit = (event) => {
        event.preventDefault();

        const taskInfo = {
            name: taskName,
            description: taskDescription,
            level: taskLevel
        }

        dispatch({type: "TASK_ADDING", payload: taskInfo});
        SetTaskName("");
        SetTaskDescription("");
        SetTaskLevel("");
    }

    return (
        <div>
            <form className="ui form" onSubmit={HandleSubmit}>
                <div className="fields">
                    <div className="four wide field">
                        <input name="taskName" type="text" placeholder="Task Name" onChange={event => SetTaskName(event.target.value)} value={taskName}/>
                    </div>
                    <div className="six wide field">
                        <input name="taskDescription" type="text" placeholder="Description" onChange={event => SetTaskDescription(event.target.value)} value={taskDescription}/>
                    </div>
                    <div className="field">
                        <select name="level" className="ui dropdown" onChange={event => SetTaskLevel(event.target.value)}>
                            <option value="0">low</option>
                            <option value="1">medium</option>
                            <option value="2">high</option>
                        </select>
                    </div>
                    <button className="ui button" type="submit"><i className="add icon"></i>Add</button>
                </div>
            </form>        
        </div>
    );
}