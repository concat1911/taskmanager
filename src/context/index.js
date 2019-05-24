import React from 'react';

const TaskListContext = React.createContext({
    tasks: [
        {id: 1, text: "Eat breakfast", complete: false},
        {id: 2, text: "Do something", complete: false},
        {id: 3, text: "Finish Project", complete: false},
        {id: 4, text: "Mathemathics", complete: false},
    ]
})

export default TaskListContext;