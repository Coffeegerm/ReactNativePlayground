import {getTodosFromRealm} from './todos.realm';
import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../redux/rootStore';

export const TodosSubscriber = () => {
  const provider = getTodosFromRealm();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    console.log('running useLayoutEffect');
    provider.forEach(val => {
      dispatch({type: ADD_TODO, payload: val});
    });
    provider.addListener((todos, changes) => {
      // watch for additions
      changes.insertions.forEach(index => {
        const insertedTodo = todos[index];
        if (insertedTodo) {
          console.log(insertedTodo);
          dispatch({type: ADD_TODO, payload: insertedTodo});
        }
      });

      changes.deletions.forEach(index => {
        const deletedTodo = todos[index];
        console.log(todos);
        console.log(deletedTodo);
        // if (deletedTodo) {
        //   console.log(deletedTodo);
        //   dispatch({type: REMOVE_TODO, payload: deletedTodo.id});
        // }
      });

      changes.newModifications.forEach(index => {
        const modifiedTodo = todos[index];
        if (modifiedTodo) {
          console.log(modifiedTodo);
          dispatch({type: UPDATE_TODO, payload: modifiedTodo});
        }
      });
    });
  }, []);
  return <View />;
};
