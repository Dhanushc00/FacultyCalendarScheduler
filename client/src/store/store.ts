import { combineReducers, createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile/profileReducer";
import AccountsReducer from './admin/AccountsReducer';
const middleware = process.env.NODE_ENV !== "production" ? [thunk] : [require('redux-immutable-state-invariant'),thunk];

const rootReducer = combineReducers({
  profile: profileReducer,
  accounts: AccountsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state:RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

export let store: Store<RootState> = createStore(
  rootReducer,
  peristedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveState(store.getState());
});
