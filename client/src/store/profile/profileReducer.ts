import { api, setToken, clearToken } from "../api";
import Cookies from "js-cookie";
import { Dispatch,Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../store'
//import { useHistory,useLocation, } from "react-router-dom";


export interface Iuser {
  email: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  roles: string[] | null;
  role: string | null;
}
export interface IuserToken {
  email: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  role: string | null;
  token: string | null;
}
export interface Icredentials {
  email: string;
  password: string;
  role: string;
}
export interface Ierror {
  error: {
    body: string[];
  };
}
/*ActionTypes------------------------------------------*/
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOAD = 'LOAD';
export const VERIFY_CRED = "VERIFY_CRED";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

interface createAccountAction {
  username: string | null;
  email: string | null;
}
interface FetchProfileAction {
  type: typeof UPDATE_PROFILE;
  payload: Iuser;
}
interface SignInAction {
  type: typeof SIGN_IN;
  payload: Iuser,
}
interface LOADAction {
  type: typeof LOAD;
}
interface SignOutAction {
  type: typeof SIGN_OUT;
}
interface RestoreTokenAction {
  type: typeof RESTORE_TOKEN;
}
export type ProfileActionTypes = FetchProfileAction|LOADAction|SignInAction|SignOutAction|RestoreTokenAction;

/*************************SignIn*********************/
export const VerifyCred = (cred: Icredentials): ThunkAction<void, RootState, unknown, Action<string>>  => async (
  dispatch
) => {
 
  console.log(cred);
  api
    .post("/users/login", {
      user: {
        email: cred.email,
        password: cred.password,
        role: cred.role,
      },
    })
    .then((res: IuserToken | any) => {
      //console.log("@#@#@##");
      //console.log(res.data.token);
      Cookies.set("token", res.data.token);
      setToken(res.data.token);
      delete res.data.token;
      console.log(res.data);
      dispatch({ type: SIGN_IN, payload: { ...res.data } });
    })
    .catch((err: Ierror) => {
      dispatch(signOut())
      Cookies.remove("token")
      console.log("&*&*&*&*&*&*");
      console.log(err);
    })
    .finally(() => console.log("api/users/login request made"));
};
/*****************************SignOut**************************************************/
export const signOut=():SignOutAction=>{
    localStorage.clear()
    clearToken();
    Cookies.remove("token");
    console.log("Reducer----rmvtoken");
    return {type: SIGN_OUT}
};
/**************After Sign In get details for update profile page***********************/
export const UpdateProfile = (): SignInAction => {
  let user: Iuser = {
    username: "",
    email: "",
    bio: "",
    image: "",
    roles: null,
    role: "",
  };
  api
    .post("/user")
    .then((res: Iuser | any) => {
      user = res;
    })
    .catch((err: Ierror) => {
      console.log(err.error.body);
    })
    .finally(() => console.log("api/user request made"));

  return { type: SIGN_IN, payload: { ...user } };
};
interface initState{
  user: Iuser,
  isLoading: boolean,
  isSignOut: boolean,
  userToken: null|string,
}

const user:Iuser={
  email: "",
  username: "",
  bio: "",
  image: "",
  role: "",
  roles:[""],
};
const intialState: initState = {
    user: user,
    isLoading: true,
    isSignOut: false,
    userToken: null,
}

export const profileReducer = (
  state = intialState,
  action: ProfileActionTypes
): initState => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state,isSignOut:false,userToken:"user",user: {...action.payload} };
    case RESTORE_TOKEN:
      return {...state,isLoading:false,userToken:"user"} 
    case LOAD:
      let tmp=state
      tmp.isLoading=false
      return {...tmp}
    case SIGN_OUT:
      let tmp1:initState=state
      tmp1.isSignOut=true
      tmp1.userToken=null
      return {...tmp1}
    default:
      return state;
  }
};

export default profileReducer;
