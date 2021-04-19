/*
<Project Name> Component
FormLogin
*/
import React, {Component} from 'react';
import { getComments } from 'features/post/post.reducer';
import {connect} from 'react-redux';

import s from './PostForm.css';

class PostForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			error_postId: "",
			postId: null,
			comments: []
		}
	}

	handleSubmit(event) {
		var check = this.checkForm();
		if(check){
			this.props.getComments(this.state.postId).then(()=>{
				setTimeout(() => {
					this.setState({comments : this.props.postReducer.comments});
				}, 3000);
			});
		}
	}
	
	checkForm(){
		if(!this.state.postId){
			this.setState({error_postId : "Veuillez entrer un post id."});
			return false;
		}
		return true;
	}

	render(){
		var comments = [];

		if(this.state.comments.length != 0){
			for (const [key, value] of Object.entries(this.state.comments)) {
				comments.push(
					<div className="col-md-12">
						<div className ="card hover-shadow my-2">
							<div className ="card-body ">
								{value.message}
							</div>
						</div>
					</div>
				)
			}
		}else{
			comments.push(
					<div className ="card hover-shadow my-2">
						<div className ="card-body ">
							Ce post n'a pas de commentaire
						</div>
					</div>
			)
		}

		return (
			<div className="form justify-content-center d-grid">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Post ID"  onChange = {(event) => this.setState({postId:event.target.value})}/>
					<span className="error_field error_postId text-danger">{this.state.error_postId}</span>
					<br></br>
					<span className="">Pour test: UWdcOFTc7DfzOhI6LpI4</span>
					<button onClick={()=>{this.handleSubmit();}} type="button" className="btn btn-primary btn-lg btn-block mt-3 mb-3" >Voir le post</button>

				</div>

				<div className="h4 justify-content-center">
					<p class="title">Commentaires</p>
					<div className="form-row justify-content-center">
						{ comments }
					</div>
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
		getComments:(idPost) =>new Promise((resolve,reject)=> {
			dispatch(getComments(idPost));
			resolve();
		}),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(PostForm)
