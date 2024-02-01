import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slice/userSlice.js"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    version:1,
    storage,
  };

  const persistedReducer = persistReducer(persistConfig,userReducer);

const store = configureStore({
  reducer: {
    user:persistedReducer
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:false,
  })
});

const persistor=persistStore(store);


export  {store, persistor};