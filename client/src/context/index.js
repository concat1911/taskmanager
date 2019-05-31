import React from 'react';

const TaskListContext = React.createContext({
    tasks: [
        {id: 1, name: "Eat breakfast", description: "Just description", level: 1, status: false},
        {id: 2, name: "Do something", description: "Just another description", level: 2, status: false},
        {id: 3, name: "Finish Project", description: "ok description", level: 3, status: false},
        {id: 4, name: "Mathemathics", description: "lel description", level: 2, status: true},
    ]
})

export default TaskListContext;