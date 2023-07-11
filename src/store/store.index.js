import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataOfFilmsReducer from "./dataSlices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataOfFilmsReducer);

// export const store = configureStore({
//   reducer: {
//     dataOfFilms: persistedReducer,
//   },
// });

export const store = configureStore({
    reducer: {
      dataOfFilms: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  

export const persistor = persistStore(store);
