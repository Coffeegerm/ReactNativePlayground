import React from 'react';
import Todos from './src/components/Todos';
import {Provider} from 'react-redux';
import {rootStore} from './src/redux/rootStore';
import {TodosSubscriber} from './src/realm/TodosSubscriber';

const App = () => {
  // Render
  return (
    <Provider store={rootStore}>
      <TodosSubscriber />
      <Todos />
    </Provider>
  );
};
export default App;
