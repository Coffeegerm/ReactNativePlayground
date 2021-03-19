import {createStore, combineReducers} from 'redux';
import {createSelector} from 'reselect';
import {getTodosFromRealm} from '../realm/todos.realm';

export const ADD_TODO = 'ADD_TODO';

const todosReducer = (
  state = [{id: 5, text: 'Buy groceries', complete: false}],
  action,
) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const todosSelector = () => {
  const todosFromRealmSelector = () => getTodosFromRealm();
  return createSelector(
    [todosFromRealmSelector, state => state.todos],
    (todos, stateTodos) => {
      console.log(stateTodos);
      return [...todos, stateTodos];
    },
  );
};

export const rootStore = createStore(combineReducers({todos: todosReducer}));
