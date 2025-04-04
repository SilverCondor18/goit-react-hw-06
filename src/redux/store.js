import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';
import filtersReducer from './filtersSlice';

const contactsPersistConfig = {
    key: "contacts_items",
    storage,
    whitelist: ["items"]
};
const filtersPersistConfig = {
    key: "name_filter",
    storage,
    whitelist: ["name"]
};

const persistedContactsReducer = persistReducer(
    contactsPersistConfig,
    contactsReducer
);

const persistedFiltersReducer = persistReducer(
    filtersPersistConfig,
    filtersReducer
);

export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filters: persistedFiltersReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);