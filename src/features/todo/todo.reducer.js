import iState from 'reducers/data';

import TodoService from './todo.service';

export default function toDoReducer(state = iState, action) {
    let fstate=state;
    switch (action.type) {
        case 'LIST_TODOS':
            return action.payload;
        case 'EDIT_TODO':
            return action.payload;
        case 'CREATE_TODO':
            return action.payload;
        case 'REMOVE_TODO':
            return action.payload;
        default:
            return fstate;          
    }
}

export function fetchTodos() {
    let todoService=new TodoService();
    return async function fetchTodosAsync(dispatch, getState) {
        todoService.getToDos().then((todos)=>{
            let istate={}
            istate.todos=todos
            let fstate={};
            fstate= Object.assign({}, getState().toDoReducer, istate)
            dispatch({ type: 'LIST_TODOS', payload: fstate })
        })
    }
}

export function createToDo(data) {
    let todoService=new TodoService();
    return async function createToDoAsync(dispatch, getState) {
        todoService.createToDo(data).then((response)=>{
            let istate = {};
            if(response){
                istate.infoMessage="Tâche enregistrée";
                let fstate = Object.assign({}, getState(), istate);
                dispatch({ type: 'CREATE_TODO', payload: fstate })
            }else{
                istate.infoMessage="Error";
                let fstate = Object.assign({}, getState(), istate);
                dispatch({ type: 'CREATE_TODO', payload: fstate })
            }
        });
    }
}
export function updateToDo(data) {
    let todoService=new TodoService();
    return async function updateToDoAsync(dispatch, getState) {
        todoService.updateToDo(data).then((todo)=>{
            todoService.getToDos().then((todos)=>{
                let istate={}
                istate.todos=todos
                let fstate={};
                fstate= Object.assign({}, getState().toDoReducer, istate)
                dispatch({ type: 'EDIT_TODO', payload: fstate })
            });
        })
    }
}


export function removeToDo(data) {  
    let todoService=new TodoService();
    return async function removeToDoAsync(dispatch, getState) {
        todoService.removeToDo(data._id).then((todo)=>{
            if(todo){
                todoService.getToDos().then((todos)=>{
                    let istate={}
                    istate.todos=todos
                    let fstate={};
                    fstate= Object.assign({}, getState().toDoReducer, istate)
                    dispatch({ type: 'REMOVE_TODO', payload: fstate })
                });
            }
        })
    }
}
