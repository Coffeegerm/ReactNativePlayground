import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {deleteTodo} from '../realm/todos.realm';

export default function TodoItem(props) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{props.item.text}</Text>

      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: '#212121',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={() => {
          deleteTodo(props.item.id);
        }}>
        <Text style={{color: '#fafafa'}}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
