import React,{useContext} from 'react';
import TasksContext from '../context/index';

export default function TaskList(){

    const {state, dispatch} = useContext(TasksContext);

    return(
        <div className="ui">
            <div className="ui three stackable cards">
                {state.tasks.map(task => (
                    <div className="green card" onDoubleClick={() => dispatch({type: "TOGGLE_STATUS", payload: task})} key={task.id}>
                        <div className="content">
                            <div className="header">{task.name}</div>
                        </div>
                        <div className="content">
                            <h1 className="ui sub header">{task.status ? "Complete" : "Incomplete"}</h1>
                        </div>
                        <div className="extra content">
                            <button className="ui button">Edit</button>
                            <button className="ui button">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}