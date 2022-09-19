import React from 'react'
import './App.css';
import Router from './router'
import { store,persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router></Router>
        </div>
      </PersistGate>
    </Provider>

  );
}

export default App;
