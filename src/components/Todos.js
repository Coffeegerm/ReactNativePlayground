import React from 'react';
import {Text, SafeAreaView, StatusBar, FlatList, Button} from 'react-native';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import {addTodo, deleteTodo} from '../realm/todos.realm';
import {connect, useDispatch} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {todosSelector, ADD_TODO} from '../redux/rootStore';

const Todos = props => {
  const dispatch = useDispatch();
  // Add a new item to the state
  function addTodoItem(_text) {
    addTodo({text: _text, complete: false});
  }

  function deleteTodoItem(id) {
    deleteTodo(id);
  }

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
        <Button
          title="Add Mock Todo"
          onPress={() => {
            dispatch({
              type: ADD_TODO,
              payload: {id: -11, text: 'Fake', complete: false},
            });
          }}
        />
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
    todos: todosSelector(),
  }),
)(Todos);
