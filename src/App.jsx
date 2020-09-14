import React, 
  {
    useReducer,
    useState
  } from 'react';

import reducer from './reducers';

import AppContext from './contexts/AppContext';
import { 
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_COMPLETED_TODO
} from './actions';

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  const handleClickAddButton = e => {
    e.preventDefault();
    dispatch({
      type: ADD_TODO,
      title: text
    })
    setText('');
  }

  const renderTodos = () => {
    return state.map((todo, index) => {

      const handleClickToggleCompletedButton = e => {
        e.preventDefault();
        dispatch({
          type: TOGGLE_COMPLETED_TODO,
          id: todo.id
        })
      }

      const toggleCompletedButtonText = todo.isCompleted ? '未完了に戻しますか?' : '完了にしますか?';


      const handleClickDeleteButton = e => {
        e.preventDefault();
        dispatch({
          type: DELETE_TODO,
          id: todo.id
        })
      }

      return (
        <li key={index}>
          {todo.title}
          <button onClick={handleClickToggleCompletedButton}>{toggleCompletedButtonText}</button>
          <button onClick={handleClickDeleteButton}>削除する</button>
        </li>
      )
    })
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <input type="text" value={text} onChange={e => {setText(e.target.value)}}/>
      <button onClick={handleClickAddButton}>追加する</button>
      <br/>
      <ul>
        {renderTodos()}
      </ul>
    </AppContext.Provider>
  );
}

export default App;
