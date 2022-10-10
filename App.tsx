import React from "react";
import AppNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from './src/store';

export default function App() {
  const { persistor, store } = makeStore();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

