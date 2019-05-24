import React, {useState, useContext} from 'react';
import TasksContext from '../context/index';

export default function TaskAdding (){
    return (
        <form className="ui form" >
            <div className="fields">
                <div className="four wide field">
                    <input name="taskName" type="text" placeholder="Task Name" />
                </div>
                <div className="six wide field">
                    <input name="taskDescription" type="text" placeholder="Description"/>
                </div>
                <div className="field">
                    <select name="level" className="ui dropdown">
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