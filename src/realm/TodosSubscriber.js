import {getTodosFromRealm} from './todos.realm';
import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ADD_TODO, SET_TODOS, UPDATE_TODO} from '../redux/rootStore';

export const TodosSubscriber = () => {
  const provider = getTodosFromRealm();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    provider.addListener((todos, changes) => {
      // watch for additions
      changes.insertions.forEach(index => {
        const insertedTodo = todos[index];
        if (insertedTodo) {
          dispatch({type: ADD_TODO, payload: insertedTodo});
        }
      });

      changes.deletions.forEach(index => {
        const allTodosNow = todos.map(val => ({
          id: val.id,
          text: val.text,
          complete: val.complete,
        }));
        if (allTodosNow) {
          dispatch({type: SET_TODOS, payload: allTodosNow});
        }
      });

      changes.oldModifications.forEach(index => {
        const todo = todos[index];
        console.log('oldMods', index, todo);
      });

      changes.newModifications.forEach(index => {
        const todo = todos[index];
        console.log('newMods', index, todo);
        const modifiedTodo = todos[index];
        if (modifiedTodo) {
          console.log(modifiedTodo);
          dispatch({type: UPDATE_TODO, payload: modifiedTodo});
        }
      });
    });
  }, [provider, dispatch]);
  return <View />;
};
