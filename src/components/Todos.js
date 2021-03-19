import React, {useState} from 'react';
import {Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import {addTodo, getTodosFromRealm, deleteTodo} from '../realm/todos.realm';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {todosSelector} from '../redux/rootStore';

const Todos = props => {
  // Add a new item to the state
  function addTodoItem(_text) {
    addTodo({text: _text, complete: false});
  }
  // Delete an item from state by index
  function deleteTodoItem(id) {
    deleteTodo(id);
  }

  // Render
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#212121'} />
      <SafeAreaView
        style={{
          padding: 16,
          justifyContent: 'space-between',
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>Todo</Text>
        <FlatList
          data={props.todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem
                item={item}
                deleteFunction={() => deleteTodoItem(item.id)}
                completeFunction={() => {}}
              />
            );
          }}
        />
        <TodoInput onPress={addTodoItem} />
      </SafeAreaView>
    </>
  );
};
export default connect(
  createStructuredSelector({
    todos: todosSelector,
  }),
)(Todos);
