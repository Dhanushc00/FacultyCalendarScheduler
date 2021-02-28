import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { TypeOf } from "yup";
import { api } from "../api";
import { ICreateAccount } from "../profile/profile";
import { UPDATE_PROFILE } from "../profile/profileReducer";

export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const UPDATE_USERS = "UPDATE_USERS";
interface AllAccounts {
  users: ICreateAccount[];
}

interface CreateAccountAction {
  type: typeof CREATE_ACCOUNT;
  payload: ICreateAccount;
}
interface UpdateUsersAction {
  type: typeof UPDATE_USERS;
  payload: ICreateAccount[];
}

export type AccountsAction = CreateAccountAction | UpdateUsersAction;

export const CreateAccount = (
  user: ICreateAccount
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  console.log(user);
  api
    .post("/users", {
      ...user,
    })
    .then((res: ICreateAccount[] | any) => {
      console.log(res);
      dispatch(GetAccounts());
      //return {type: UPDATE_USERS , payload: res}
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("/api/users request made"));
};

export const GetAccounts = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  
  api
    .get("/users/allusers")
    .then((res: ICreateAccount[] | any) => {
      console.log(res);
      dispatch({ type: UPDATE_USERS, payload: res.data });
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("/api/users/allusers request made"));
};

const initialState: AllAccounts = { users: [] };
export const AccountsReducer = (
  state = initialState,
  action: AccountsAction
): any => {
  switch (action.type) {
    case UPDATE_USERS:
      console.log("Inside UPDATE_USER", action.payload);
      return { users: [...action.payload] };
    default:
      return state;
  }
};

export default AccountsReducer;
