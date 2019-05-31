import React, {useContext, useReducer} from 'react';
import ReactDOM from 'react-dom';

import TaskListContext from './context/';
import TasksReducer from './reducers/';

//Components
import TaskList from './components/TaskList';
import TaskAdding from './components/TaskAdding';

const App = () => {

    const initTasks = useContext(TaskListContext);
    
    const [state, dispatch] = useReducer(TasksReducer, initTasks);

    return (
        <TaskListContext.Provider value={{state, dispatch}}> 
            <div className="ui container">
                <div className="mt-3">
                    {/* <h1 className="word">TASKS MANAGER v.0.2 <a href="http://nhatlinh.de" className="ui small circular left floated image"><img src="image/Melancholie_logo.png" alt="melancholie the lab luckentext maker"/></a></h1> */}
                </div>
                <div className="ui buttons">
                    <div className="ui green button"><a href="/auth/google">Sign in with google</a></div>
                    <div className="ui red button"><a href="/auth/google">Logout</a></div>
                </div> 
            </div>

            <div className="ui container">
                <TaskAdding />
                <div className="ui horizontal divider"><div className="ui red header">REMAINNING TASKS</div></div>
                <TaskList />
            </div>
        </TaskListContext.Provider>
    );
}

ReactDOM.render(
<App />
, document.getElementById('root'));
