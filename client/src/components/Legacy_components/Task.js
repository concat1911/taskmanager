import React, {Component} from 'react';
import { Button, Modal } from 'semantic-ui-react';

class Task extends Component {

    state = {
        subtaskInput: '',
        editName: '',
        editDescription: '',
        editLevel: '',
        modalOpen: false,
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    componentWillMount() {
        this.setState({
            editName: this.props.info.name,
            editDescription: this.props.info.description,
            editLevel: this.props.info.level
        });
    }

    getLevel = () => {
        const level = this.props.info.level;

        if(level === '0'){
            return 'low';
        }else if(level === '1'){
            return 'medium';
        }else{
            return 'high';
        }
    }

    onEditSubmit = (e) => {
        e.preventDefault();
        
        //Prevent overLoad
        if(this.state.editName !== this.props.info.name || this.state.editLevel !== this.props.info.level || this.state.editDescription !== this.props.info.description){
            this.props.taskEdit(this.props.info.key, this.state.editName, this.state.editDescription, this.state.editLevel);
        }else{
            console.log("Edit Task require new state");
        }

        this.handleClose();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onStatusChange = () => {
        this.props.taskStatusEdit(this.props.info.key);
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.subTaskAdd(this.props.info.key ,this.state.subtaskInput);

        this.setState({subtaskInput: '',});
    }

    onSubTaskDelete = (index) => {
        this.props.subTaskDelete(this.props.info.key, index)
    }

    render(){
        const { info } = this.props;
        
        //render SubTaskList
        const elementSubTasks = info.subTasks.map((item, index) => {
            return (
                <div key={index} className="ui green header wrapText">{item} <span className="ui red header right floated" onClick={() => this.onSubTaskDelete(index)}>[x]</span></div>
            );
        })

        return (
            <div className="column" >
                <div className="ui card">
                    <div className="content">
                        <h4 className={info.status ? 'ui green header' : 'ui red header'}>[#{info.key}]-[{this.getLevel()}]-[{info.status ? 'done' : 'undone'}]</h4>
                        <h2 className="ui header">{info.name}</h2>
                        {info.description}
                    </div>

                    <div className="content">
                        <h4 className="ui header center aligned">sub tasks</h4>
                        <div className="ui items">
                            {elementSubTasks}
                        </div>
                    </div>

                    <div className="extra content">
                        <form onSubmit={this.onSubmit}>
                            <div className="ui large transparent right icon fluid input">
                                <i className="plus icon"></i>
                                <input name="subtaskInput" value={this.state.subtaskInput} onChange={(e) => this.onInputChange(e)} placeholder="add new subtask"/>
                            </div>
                        </form>
                    </div>

                    <div className="extra content">
                        <div className="three ui buttons">
                            <Button onClick={this.handleOpen}>Edit</Button>
                            <Button onClick={this.onStatusChange} toggle>Done</Button>
                            <Button onClick={() => this.props.taskDelete(info.key)}>Delete</Button>
                        </div>
                    </div>
                    <Modal open={this.state.modalOpen} onClose={this.handleClose}>
                            <Modal.Header>Edit Task</Modal.Header>
                            <Modal.Content image>
                                <Modal.Description>
                                    <form className="ui form" onSubmit={this.onEditSubmit} >
                                        <div className="fields">
                                            <div className="four wide field">
                                                <input name="editName" type="text" placeholder="Task Name" onChange={this.onInputChange} value={this.state.editName}/>
                                            </div>
                                            <div className="six wide field">
                                                <input name="editDescription" type="text" placeholder="Description" onChange={this.onInputChange} value={this.state.editDescription}/>
                                            </div>
                                            <div className="field">
                                                <select name="editLevel" className="ui dropdown" onChange={this.onInputChange} value={this.state.editLevel}>
                                                    <option value="0">low</option>
                                                    <option value="1">medium</option>
                                                    <option value="2">high</option>
                                                </select>
                                            </div>
                                            <button className="ui button" type="submit"><i className="add icon"></i>Add</button>
                                        </div>
                                    </form>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                </div>
            </div>
        );
    }
}

export default Task;