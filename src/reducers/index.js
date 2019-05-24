export default function TasksReducer(state, action) {
    switch(action.type){
        case "TOGGLE_STATUS":
            const toggleStatus = state.tasks.map(task => 
                task.id === action.payload.id ? {...action.payload, status: !action.payload.status} : task
            )
            return {
                ...state,
                tasks: toggleStatus
            }
        default:
            return state;
    }
}