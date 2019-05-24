import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';

import TaskListContext from './context/';
import TasksReducer from './reducers/';

const App = () => {

    const initTasks = useContext(TaskListContext);
    
    const [state, dispatch] = useReducer(TasksReducer, initTasks);

    return (
        <TaskListContext value={{state, dispatch}}> 
            <div class="ui container">
                <h1 class="ui header">Tasks Manager</h1>
            </div>
        </TaskListContext>
    );
}

ReactDOM.render(
<App />
, document.getElementById('root'));
