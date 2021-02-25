import { combineReducers, createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profileReducer";
const middleware = process.env.NODE_ENV !== "production" ? [thunk] : [thunk];

const rootReducer = combineReducers({
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export let store: Store<RootState> = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware)
);
