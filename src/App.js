import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import ToDoPageManager from "features/todo/components/ToDoPageManager.js";
import PostPageManager from "features/post/components/PostPageManager.js";

class App extends Component {o
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div className='App'>
          <Switch>
            <Route exact path='/' render={() => (
              <ToDoPageManager/>
            )} />
          </Switch>
          <Switch>
            <Route exact path='/post' render={() => (
              <PostPageManager/>
            )} />
          </Switch>
        </div>

      </div>
    )
  }
}

export default App;
