import React, {Component} from 'react';
import Task from './Task';

class TaskList extends Component {

    render(){
        const items = this.props.entries;

        const elementItems = items.map((item, index) => {
            return (
                <Task 
                    info={item} 
                    key={index} 
                    taskDelete={this.props.taskDelete} 
                    taskEdit={this.props.taskEdit} 
                    taskStatusEdit={this.props.taskStatusEdit}
                    subTaskAdd={this.props.subTaskAdd}
                    subTaskDelete={this.props.subTaskDelete}
                />
            );
        })

        return (
            <div className="ui stackable three column grid container">
                {elementItems}         
            </div>
        );
    }
}

export default TaskList;