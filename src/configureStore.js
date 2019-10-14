import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStateSyncMiddleware } from "redux-state-sync";

const middlewares = [
  thunk,
  createStateSyncMiddleware({
    // blacklist: ["extras", "products"]
    whitelist: [
      "cart",
      "user",
      "location",
      "ambassadoruser",
      "wishList",
      "checkout",
      "firstSetting"
    ]
  })
];
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "cart",
    "user",
    "location",
    "ambassadoruser",
    "wishList",
    "checkout",
    "firstSetting"
  ]
};
const sessionRedConfig = {
  key: "referrer",
  storage: sessionStorage
};
const { referrer, ...otherReducer } = rootReducer;
const allReducers = combineReducers({
  ...otherReducer,
  referrer: persistReducer(sessionRedConfig, referrer)
});
const persistedReducer = persistReducer(persistConfig, allReducers);
export default () => {
  let store = createStore(
    persistedReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    undefined,
    compose(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
