import ToDoRepository from './todo.repository';

class ToDoService {
    constructor(){
    }
    
    async getToDos(){
        return new Promise((resolve, reject)=>{
            let toDoRepository=new ToDoRepository()
            toDoRepository.all().then( async (todos)=>{
                todos.sort((a, b) => (a.doc.date < b.doc.date) ? 1 : -1);
                resolve(todos)
            })
        })
    }

    async createToDo(todo){
        return new Promise((resolve, reject) => {
            let toDoRepository=new ToDoRepository()
            toDoRepository.createToDo(todo).then(result=>{
                resolve(result);
            })
        })
    }

    async updateToDo(todo){
        return new Promise((resolve, reject) => {
            let toDoRepository=new ToDoRepository()
            toDoRepository.update(todo).then(result=>{
                toDoRepository.getToDoById(todo.id).then(todo=>{
                    resolve(todo);
                })
            })
        })
    }

    async removeToDo(todo){
        return new Promise((resolve, reject) => {
            let toDoRepository=new ToDoRepository()
            toDoRepository.remove(todo).then(result=>{
                resolve(result);
            })
        })
    }

}

export default ToDoService;