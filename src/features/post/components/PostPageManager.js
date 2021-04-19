import React, {Component} from 'react';
import PostForm from './PostForm/PostForm';
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from 'react-router-dom';


class PostPageManager extends Component {
	constructor(props) {
		super(props);
		this.goToToDo = this.goToToDo.bind(this);
		this.state={
			redirect: ""
		}
	}
	
	goToToDo(){
		this.setState({redirect : "/"});
	}

	render(){
		if(this.state.redirect){
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className="container-fluid">
				<div className="row justify-content-center mt-5">
					<div className="main-container">
						<button type="button" className="btn btn-dark" onClick={this.goToToDo}>Aller à ToDo</button>
					</div>	
				</div>
				<div className="row justify-content-center mt-5">
					<div className="main-container col-md-12">
                        <PostForm />
					</div>	
				</div>
			</div>
		)
	}
	
}

export default  PostPageManager