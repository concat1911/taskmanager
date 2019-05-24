import React,{useState, useContext} from 'react';
import TasksContext from '../context/index';
import { Modal } from 'semantic-ui-react';

export default function TaskList(){

    const {state, dispatch} = useContext(TasksContext);
    //MODAL
    const [modalOpen, ToggleModal] = useState(false);

    return(
        <div className="ui">
            <div className="ui three stackable cards">
                {state.tasks.map(task => (
                    <div className="green card" onDoubleClick={() => dispatch({type: "TOGGLE_STATUS", payload: task})} key={task.id}>
                        <div className="content">
                            <div className="header">{task.name} <div className="sub header">Level: {task.level}</div></div>             
                        </div>
                        <div className="content">
                            <h1 className="ui sub header">{task.status ? "Complete" : "Incomplete"}</h1>
                            <h2 className="ui header">{task.description}</h2>
                        </div>
                        <div className="extra content">
                            <button className="ui button" onClick={() => ToggleModal(true)}>Edit</button>
                            <button className="ui button" onClick={() => dispatch({type: "REMOVE_TASK", payload: task})}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <Modal open={modalOpen} onClose={() => ToggleModal(false)}>
                <Modal.Header>Edit Task</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form className="ui form">
                            <div className="fields">
                                <div className="four wide field">
                                    <input name="editName" type="text" placeholder="Task Name"/>
                                </div>
                                <div className="six wide field">
                                    <input name="editDescription" type="text" placeholder="Description" />
                                </div>
                                <div className="field">
                                    <select name="editLevel" className="ui dropdown">
                                        <option value="0">low</option>
                                        <option value="1">medium</option>
                                        <option value="2">high</option>
                                    </select>
                                </div>
                                <button className="ui button" type="submit"><i className="add icon"></i>Change</button>
                            </div>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>  
        </div>
    );
}