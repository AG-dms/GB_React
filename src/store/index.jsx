import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {chatsReducer} from './chats/reducer';
import {profileReducer} from './profile/reducer';
import {messagesReducer} from './messages/reducer';
// Импортируем объекты и storage
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {newsReducer} from './news/reducer';

// Создаем настройки
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['news'],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  news: newsReducer,
});

// Создаем редьюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
