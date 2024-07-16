import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import userSlice from "./userSlice";

// import rootReducer from './reducers'; // Replace with your actual root reducer

// Combine your slices into a root reducer
const rootReducer = combineReducers({
    user: userSlice,
});

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
};
// const makeStore = () => {
//   const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//   });
// };

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };








// export default makeStore;
