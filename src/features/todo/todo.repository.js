import PouchdbFind from 'pouchdb-find';
import * as PouchDB from 'pouchdb/dist/pouchdb';
class ToDoRepository {
    constructor(){
        PouchDB.plugin(PouchdbFind);
        this.db = new PouchDB('todo',{});
    }

    all(){
        return new Promise((resolve, reject)=>{
            this.db.allDocs({
                include_docs: true,
                descending: true
            }).then(function (result) { 
                resolve(result.rows);
            }).catch(function (err) {
                console.log(err)
            })
        });
    }

    getToDoById(id){
        return new Promise((resolve, reject)=>{
            this.db.find({
                selector : {
                    id : id         
                }
            }).then(function (result) { 
                resolve(result.docs[0]);
            }).catch(function (err) {
                console.log(err)
            })          
        });
    }

    createToDo(todo){ 
        return new Promise((resolve, reject)=>{
            var doc = {
                'id' : todo.id,
                'title' : todo.title,
                'date' : todo.date,
                'active' : todo.active
            }
            this.db = new PouchDB('todo');
            this.db.post(doc, function(err, response) {
                if (err) {
                    return console.log(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    remove(_id){
        const _this = this;
        return new Promise((resolve, reject)=>{
            this.db.find({
                selector : {
                    _id : _id         
                }
            }).then(function (result) { 
                resolve(_this.db.remove(result.docs[0]));
            }).catch(function (err) {
                console.log(err)
            })      
        });
    }

    update(data){
        const _this = this;
        return new Promise((resolve, reject)=>{
            this.db.find({
                selector : {
                    _id : data._id         
                }
            }).then(function (result) { 
                _this.db.put({
                    _rev: result.docs[0]._rev,
                    _id: result.docs[0]._id,
                    active: data.active,
                    title: data.title,
                    date: data.date
                }).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function (err) {
                console.log(err)
            })  
        }) 
    }
}

export default ToDoRepository;