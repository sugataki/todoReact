import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_COMPLETED_TODO
} from '../actions';

const todos = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      console.log(state);
      const length = state.length;
      const id = length === 0 ? 1 : state[length - 1].id + 1;
      const todo = {
        id,
        title: action.title,
        isCompleted: false
      }
      return [...state, todo];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_COMPLETED_TODO:
      const newState =  [...state];
      newState.forEach((todo, index) => {
        if (action.id === todo.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      })
      return newState;
    default: 
      return state;
  }
}

export default todos;