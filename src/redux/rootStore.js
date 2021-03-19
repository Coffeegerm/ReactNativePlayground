import {createStore, combineReducers} from 'redux';
import {createSelector} from 'reselect';
import {getTodosFromRealm} from '../realm/todos.realm';

const ADD_TODO = 'ADD_TODO';

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state;
    default:
      return state;
  }
};

export const todosSelector = () => {
  return createSelector([getTodosFromRealm], todos => todos);
};

export const rootStore = createStore(combineReducers({todos: todosReducer}));
