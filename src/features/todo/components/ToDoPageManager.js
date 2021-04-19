import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import ToDoList from './ToDoList/ToDoList';
import ToDoForm from './ToDoForm/ToDoForm';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";


class ToDoPageManager extends Component {
	constructor(props) {
		super(props);
		
		this.onCreateToDoClick = this.onCreateToDoClick.bind(this);
		this.onUpdateToDoClick = this.onUpdateToDoClick.bind(this);
		this.goToPost = this.goToPost.bind(this);
		
		this.closeModal=this.closeModal.bind(this)
		this.onModalChange=this.onModalChange.bind(this)
		
		this.state={
			modalIsOpen:false,
			modalTitle:"",
			todo: {},
			redirect: ""
		}
	}
	
	onCreateToDoClick(){
		this.setState({
			modalIsOpen:true,
			modalTitle: "Création de nouvelle tâche",
			type: "creation"
		});
	}

	onUpdateToDoClick(todo){
		this.setState({
			modalIsOpen:true,
			modalTitle: "Modification de tâche",
			todo: todo,
			type: "modification"
		});
	}

	closeModal(){
		this.setState({
			modalIsOpen:false
		});
	}

	onModalChange (value) {
		this.setState({
			modalIsOpen:value
		});    
	}

	goToPost(){
		this.setState({redirect : "/post"});
	}

	render(){
		if(this.state.redirect){
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className="container-fluid">
				<div className="row justify-content-center mt-5">
					<div className="main-container">
						<button type="button" className="btn btn-dark" onClick={this.goToPost}>Aller à Post</button>
					</div>	
				</div>
				<div className="row justify-content-center mt-5">
					<div className="main-container col-md-12">
						<ToDoList
							onUpdateToDoClick = {this.onUpdateToDoClick}
						/>
					</div>	
				</div>
				<div className="row justify-content-center">
					<div className="main-container">
						<button type="button" className="btn btn-dark" onClick={this.onCreateToDoClick}>Créer une nouvelle tâche</button>
					</div>	
				</div>
				<Modal 
					show={this.state.modalIsOpen}
				>
					<Modal.Header className ="">
						{ this.state.modalTitle }
						<button type="button" className="close" onClick={this.closeModal} >
							<span aria-hidden="true">&times;</span>
						</button>
					</Modal.Header>
					<Modal.Body>					
						<ToDoForm 
							onModalChange = {this.onModalChange}
							onCreateToDoClick = {this.onCreateToDoClick}
							type = {this.state.type}
							todo = {this.state.todo}
						/>
					</Modal.Body>
				</Modal>
			</div>
		)
	}
	
}

export default  ToDoPageManager