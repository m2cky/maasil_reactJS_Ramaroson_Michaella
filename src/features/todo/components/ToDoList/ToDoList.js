/*
<Project Name> Component
FormLogin
*/
import React, {Component} from 'react';
import { fetchTodos, updateToDo, removeToDo } from 'features/todo/todo.reducer';

import style from './ToDoList.css';


import {connect} from 'react-redux';

class ToDoList extends Component {
	constructor(props) {
		super(props);
		
		this.handleActive=this.handleActive.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

		this.listToDos=this.listToDos.bind(this);
		
		this.state={
			modalIsOpen:false,
			title: "",
			date: "",
			active: false
		}
		this.listToDos();
	}

	listToDos(){
		this.props.getToDos();
	}

	handleActive(todo){
		if(todo.active){
			todo.active = false;
		}else{
			todo.active = true;
		}
		this.props.editToDo(todo).then(()=>{
			this.listToDos();
		});
	}
	
	handleDelete(todo){
		this.props.removeToDo(todo).then(()=>{
			this.listToDos();
		});
	}

	render(){
		if(this.props.toDoReducer.todos){
			var toDos = [];
			for (const [key, value] of Object.entries(this.props.toDoReducer.todos)) {
				toDos.push(
					<div className="col-md-12 row">
						<button className ="card hover-shadow col-md-8 my-2" type="button" onClick={()=>{this.handleActive(value.doc);}}>
							<div className ="card-body row">
								<div className ="col-md-6">
									{value.doc.title}
								</div>
								<div className ="col-md-4">
									{value.doc.date}
								</div>
								<div className ="col-md-2">
									{value.doc.active ? "Active" : "Inactive"}
								</div>
								<input key = {key} type = "hidden" value={key}/>
							</div>
						</button>
						<button className ="card hover-shadow col-md-2 my-2" type="button" onClick={()=>{this.props.onUpdateToDoClick(value.doc);}}>
							Modifier
						</button>
						<button className ="card hover-shadow col-md-2 my-2" type="button" onClick={()=>{this.handleDelete(value.doc);}}>
							Supprimer
						</button>
					</div>
				)
			}
		}else{
			this.listToDos();
		}

		return(
			<div className="h4 justify-content-center">
				<p class="title">Liste des tâches</p>
				<div className="form-row justify-content-center">
					{ toDos }
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return state
}
const mapDispatchToProps= (dispatch)=> {
	return {
		getToDos:() => {
			dispatch(fetchTodos());
		},
		editToDo:(todo) =>new Promise((resolve,reject)=> {
			dispatch(updateToDo(todo));
			resolve();
		}),
		removeToDo:(todo) =>new Promise((resolve,reject)=> {
			dispatch(removeToDo(todo));
			resolve();
		})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoList)
