import uuidv4 from 'uuid/v4';

export default function TasksReducer(state, action) {
    switch(action.type){
        case "TASK_ADDING":
            const newTask = {
                id: uuidv4(),
                name: action.payload.name,
                description: action.payload.description,
                level: action.payload.level,
                status: false
            }
            
            const taskAdding = [...state.tasks, newTask];
            return {
                ...state,
                tasks: taskAdding
            }

        case "TOGGLE_STATUS":
            const toggleStatus = state.tasks.map(task => 
                task.id === action.payload.id ? {...action.payload, status: !action.payload.status} : task
            )
            return {
                ...state,
                tasks: toggleStatus
            }

        case "REMOVE_TASK":
            const newTaskList = state.tasks.filter(task => task.id !== action.payload.id);
            return{
                ...state,
                tasks: newTaskList
            };
            
        default:
            return state;
    }
}