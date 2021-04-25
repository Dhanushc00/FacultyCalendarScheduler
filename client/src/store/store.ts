import { combineReducers, createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import profileReducer from "./profile/profileReducer";
import AccountsReducer from './admin/AccountsReducer';
import SemReducer from './semester/semesterReducer';
import DayReducer from './Days/daysReducer';
import PeriodsReducer from "./classperiods/periodsReducer";
import EventReducer from './Events/EventReducer';
import notificationReducer from './notification/notification';
import LeaveReducer from './applyLeave/leaveReducer';
const middleware = process.env.NODE_ENV !== "production" ? [thunk] : [require('redux-immutable-state-invariant'),thunk];

const rootReducer = combineReducers({
  profile: profileReducer,
  accounts: AccountsReducer,
  sem: SemReducer,
  day: DayReducer,
  period: PeriodsReducer,
  events: EventReducer,
  leave: LeaveReducer,
  rem:notificationReducer,
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
