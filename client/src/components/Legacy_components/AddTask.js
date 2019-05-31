import React, {Component} from 'react';

class AddTask extends Component {

    state = {
        taskName: '',
        taskDescription: '',
        level: '1',
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.state.taskName !== ''){
            this.props.taskAdd(this.state.taskName, this.state.taskDescription, this.state.level);
            this.setState({
                taskName: '',
                taskDescription: ''
            });
        }else{
            console.log("Task must have a name!");
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    
    render(){
        return (
            <form className="ui form" >
                <div className="fields">
                    <div className="four wide field">
                        <input name="taskName" type="text" placeholder="Task Name" onChange={} value={}/>
                    </div>
                    <div className="six wide field">
                        <input name="taskDescription" type="text" placeholder="Description" onChange={} value={}/>
                    </div>
                    <div className="field">
                        <select name="level" className="ui dropdown" onChange={} value={}>
                            <option value="0">low</option>
                            <option value="1">medium</option>
                            <option value="2">high</option>
                        </select>
                    </div>
                    <button className="ui button" type="submit"><i className="add icon"></i>Add</button>
                </div>
            </form>
        );
    }
}

export default AddTask;