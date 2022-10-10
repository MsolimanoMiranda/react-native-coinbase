

import { createStore } from 'redux';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

export const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor }
}