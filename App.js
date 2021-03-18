import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import {addTodo, getTodosFromRealm} from './src/realm/todos.realm';

const App = () => {
  const [todoItems, setTodoItems] = useState(getTodosFromRealm());

  // Add a new item to the state
  function addTodoItem(_text) {
    addTodo({text: _text, complete: false});
    setTodoItems(getTodosFromRealm());
  }

  // Delete an item from state by index
  function deleteTodoItem(_index) {
    let tempArr = [...todoItems];
    tempArr.splice(_index, 1);
  }

  // Function to set completed to true by index.
  function completeTodoItem(_index) {
    let tempArr = [...todoItems];
    tempArr[_index].completed = true;
  }

  // Render
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#212121'} />
      <SafeAreaView
        style={{padding: 16, justifyContent: 'space-between', flex: 1}}>
        <Text style={{fontSize: 36, fontWeight: 'bold'}}>Todo</Text>
        <FlatList
          data={todoItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem
                item={item}
                deleteFunction={() => deleteTodoItem(index)}
                completeFunction={() => completeTodoItem(index)}
              />
            );
          }}
        />
        <TodoInput onPress={addTodoItem} />
      </SafeAreaView>
    </>
  );
};

export default App;
