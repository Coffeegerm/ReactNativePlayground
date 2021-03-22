import {createStore, combineReducers} from 'redux';
import {createSelector} from 'reselect';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      return state.filter(val => val.id !== action.payload);
    case UPDATE_TODO:
      return state.map(val => {
        if (val.id === action.payload.id) {
          return action.payload;
        } else {
          return val;
        }
      });
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
