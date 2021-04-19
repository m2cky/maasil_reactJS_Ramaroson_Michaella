/*
<Project Name> Component
FormLogin
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createToDo, updateToDo } from 'features/todo/todo.reducer';

import s from './ToDoForm.css';

class ToDoForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.checkForm=this.checkForm.bind(this);
				
		this.state = {
			error_title: "",
			title: this.props.todo.title ? this.props.todo.title : ""
		}
	}

	handleSubmit(event) {
		var check = this.checkForm();
		if(check){
			if(this.props.type == "creation"){
				var todo = {
					title : this.state.title,
					date : Intl.DateTimeFormat("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
						month: "2-digit",
        				day: "2-digit",
        				year: "2-digit"
					  }).format(new Date()),
					active : false
				};
				this.props.createToDo(todo).then(()=>{
					this.props.onModalChange(false);
				});
			}else if(this.props.type == "modification"){
				var todo = this.props.todo;
				todo.title = this.state.title;
				this.props.editToDo(todo).then(()=>{
					this.props.onModalChange(false);
				});
			}
			
		}
	}
	
	checkForm(){
		if(!this.state.title){
			this.setState({error_title : "Veuillez entrer un titre."});
			return false;
		}
		return true;
	}

	render(){
		return (
			<div className="form">
				<div className="form-group">
					<input type="text" name="title" id="title" className="form-control" placeholder="Titre"  onChange = {(event) => this.setState({title:event.target.value})} value={ this.state.title }/>
					<span className="error_field error_title">{this.state.error_title}</span>
				</div>
				<p><button onClick={()=>{this.handleSubmit();}} type="button" className="btn btn-primary btn-lg btn-block" >Enregistrer</button></p>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return state
}
const mapDispatchToProps= (dispatch)=> {
	return {
		createToDo:(todo) =>new Promise((resolve,reject)=> {
			dispatch(createToDo(todo));
			resolve();
		}),
		editToDo:(todo) =>new Promise((resolve,reject)=> {
			dispatch(updateToDo(todo));
			resolve();
		})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoForm)