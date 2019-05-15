import React, { Component } from 'react';
import {filter, includes, orderBy, remove} from 'lodash';

import Search from '../containers/Search';
import Filter from '../containers/Filter';
import TaskList from '../containers/TaskList';
import AddTask from '../containers/AddTask';

class App extends Component {

    state={
        tasks: [],
        curKey: 1,
        strSearch: '',
        sortBy: 'id',
        sortDir: 'asc',
    }
    //Load localstorage
    componentWillMount(){
        if(localStorage.getItem("tasks")){
            const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
            this.setState({curKey: tasksLocal.length + 1});
            this.setState({tasks : tasksLocal});
        }
    }

    onSearch = (term) => {
        this.setState({strSearch: term});
    }

    taskAdd = (name, description, level) => {
        let {tasks} = this.state;

        tasks.push({
            name: name,
            subTasks: [],
            description: description,
            level: level,
            status: false,
            key: this.state.curKey,
        });

        this.setState({
            tasks: tasks,
            curKey: this.state.curKey + 1,
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    taskDelete = (key) => {
        const newTasks = remove(this.state.tasks, (task) => {
            return task.key !== key;
        });

        for (let index = 1; index <= newTasks.length; index++) {
            if(newTasks[index - 1].key > key){
                newTasks[index - 1].key = index;
            }
        }

        this.setState({
            tasks: newTasks,
            curKey: this.state.curKey - 1,
        });

        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    taskEdit = (key, name, description, level) => {
        const newTasks = [...this.state.tasks];

        newTasks[key-1].name = name;
        newTasks[key-1].level = level;
        newTasks[key-1].description = description;

        this.setState({
            tasks: newTasks
        });

        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    taskStatusEdit = (key) => {
        const newTasks = [...this.state.tasks];
        newTasks[key-1].status ? newTasks[key-1].status = false : newTasks[key-1].status = true;

        this.setState({
            tasks: newTasks
        });

        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    subTaskAdd = (key, subTaskName) => {
        let {tasks} = this.state;

        tasks[key - 1].subTasks.push(subTaskName);

        this.setState({tasks: tasks,});

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    subTaskDelete = (key, subTaskIndex) => {
        let tasks = this.state.tasks;

        tasks[key - 1].subTasks.splice(subTaskIndex,1);

        this.setState({tasks: tasks,});
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    sortBy = (mode) => {
        console.log(mode);
        this.state.sortDir === 'asc' ? this.setState({sortDir: 'desc'}) : this.setState({sortDir: 'asc'});
        this.setState({sortBy: mode});
    }

    render() {

        let totalTasks = [...this.state.tasks];
        let displayTasks = [];

        let {sortBy, sortDir, strSearch} = this.state;

        //SEARCH
        displayTasks = filter(totalTasks, (item) => {
            return  includes(item.name.toLocaleLowerCase(), strSearch.toLocaleLowerCase());
        });

        //SORT
        displayTasks = orderBy(displayTasks, [sortBy], [sortDir]);

        return (
            <div className="ui stackable grid container mt-3">        
                <div className="row">
                    <div className="mt-3">
                        <h1 className="word">TASKS MANAGER v.0.1 <a href="http://nhatlinh.de" className="ui small circular left floated image"><img src="image/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="left floated column">        
                        <Filter sortBy={this.sortBy}/>         
                    </div>
                    <div className="four wide right floated column">                     
                        <Search onSearch={this.onSearch} />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <AddTask taskAdd={this.taskAdd}/>
                    </div>
                </div>

                <div className="ui horizontal divider">
                    <div className="ui orange header">TASK LIST</div>
                </div>

                <div className="row mt-3">
                    <TaskList 
                        entries={displayTasks} 
                        sortBy={this.sortBy} 
                        taskDelete={this.taskDelete} 
                        taskEdit={this.taskEdit} 
                        taskStatusEdit={this.taskStatusEdit}
                        subTaskAdd={this.subTaskAdd}
                        subTaskDelete={this.subTaskDelete}
                    />
                </div>

                <div className="ui header center aligned">
                    <h5>Built with React & love, DD 2019. <a href="https://nhatlinh.de">CONTACT</a></h5>
                </div>
            </div>
        );
    }
}

export default App;
