import { combineReducers } from 'redux';
import toDoReducer from '../features/todo/todo.reducer'
import postReducer from '../features/post/post.reducer'

export default combineReducers({
  toDoReducer,
  postReducer
})
