import {createStore, combineReducers} from 'redux';
import {createSelector} from 'reselect';
import {getTodosFromRealm} from '../realm/todos.realm';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SET_TODOS = 'SET_TODOS';

const getInitialState = () => {
  const todos = getTodosFromRealm();
  return todos.map(val => {
    return {id: val.id, text: val.text, complete: val.complete};
  });
};

const todosReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      return state.filter(val => action.payload.includes(val.id));
    case UPDATE_TODO:
      return state.map(val => {
        if (val.id === action.payload.id) {
          return action.payload;
        } else {
          return val;
        }
      });
    case SET_TODOS:
      return action.payload;
    default:
      return state;
  }
};

export const todosSelector = createSelector(
  [state => state.todos],
  stateTodos => {
    return stateTodos;
  },
);

export const rootStore = createStore(combineReducers({todos: todosReducer}));
