import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// importing Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Importing Persistors
// This is needed to persist the state on page reload
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Importing reducer
import reducer from "./reducers";

// Creating a persisted store to persist state on page reload
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
