import React from 'react';
import Todos from './src/components/Todos';
import {Provider} from 'react-redux';
import {rootStore} from './src/redux/rootStore';

const App = () => {
  // Render
  return (
    <Provider store={rootStore}>
      <Todos />
    </Provider>
  );
};
export default App;
