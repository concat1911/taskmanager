import React from 'react';

const TaskListContext = React.createContext({
    tasks: [
        {id: 1, name: "Eat breakfast", status: false},
        {id: 2, name: "Do something", status: false},
        {id: 3, name: "Finish Project", status: false},
        {id: 4, name: "Mathemathics", status: true},
    ]
})

export default TaskListContext;