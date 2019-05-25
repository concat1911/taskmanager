import React,{useState, useContext} from 'react';
import TasksContext from '../context/index';
import { Modal } from 'semantic-ui-react';

export default function TaskList(){

    const {state, dispatch} = useContext(TasksContext);
    
    //EDITOR MODAL
    const [nameEditor, SetNameEditor] = useState("");
    const [descripEditor, SetDescripEditor] = useState("");
    const [levelEditor, SetLevelEditor] = useState(0);

    const [modalOpen, ToggleModal] = useState(false);

    const OnModalOpen = task => {
        SetNameEditor(task.name);
        SetDescripEditor(task.description);
        SetLevelEditor(task.level);
        ToggleModal(true);
    }

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
                            <button className="ui button" onClick={() => OnModalOpen(task)}>Edit</button>
                            <button className="ui button" onClick={() => dispatch({type: "REMOVE_TASK", payload: task})}>Remove</button>
                        </div>

                        {/* MODAL */}
                        <Modal open={modalOpen} onClose={() => ToggleModal(false)}>
                            <Modal.Header>Edit Task</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description>
                                    <form className="ui form">
                                        <div className="fields">
                                            <div className="four wide field">
                                                <input name="editName" type="text" placeholder="Task Name" value={nameEditor}/>
                                            </div>
                                            <div className="six wide field">
                                                <input 
                                                    name="editDescription" 
                                                    type="text" 
                                                    placeholder="Description" 
                                                    value={descripEditor} 
                                            />
                                            </div>
                                            <div className="field">
                                                <select name="editLevel" className="ui dropdown" value={levelEditor}>
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
                ))}
            </div> 
        </div>
    );
}