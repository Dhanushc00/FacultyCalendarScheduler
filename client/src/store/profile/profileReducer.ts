import { api, setToken, clearToken } from "../api";
import Cookies from "js-cookie";
import { Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Icredentials, Iuser, IuserRes } from "./profile";
import { Ierror } from "../utils";

/*ActionTypes------------------------------------------*/
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
interface SignInAction {
  type: typeof SIGN_IN;
  payload: Iuser;
}
interface SignOutAction {
  type: typeof SIGN_OUT;
}
export type ProfileActionTypes = SignInAction | SignOutAction;

/*************************SignIn*********************/
export const VerifyCred = (
  cred: Icredentials,
  toast: any | undefined,
  history: any | undefined,
  from: any|undefined,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
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
    .then(async(res: IuserRes | any) => {
      toast({
        title: "Login Success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      await Cookies.set("token", res.data.token);
      await Cookies.set("role",res.data.role);
      delete res.data.token;
      console.log(res.data);
      // await history.push("protected", res.data.role);
      await history.replace(from,res.data.role);
      dispatch({ type: SIGN_IN, payload: { ...res.data } });
    })
    .catch(async(err: Ierror|any) => {
      console.log("YYYYYYYYYYYYY")
      console.log(JSON.stringify(err.response));
      toast({
        title: "Login Failure",
        description: JSON.stringify(err.response.data),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      //await history.push("login");
    })
    .finally(() => console.log("api/users/login request made"));
};
/*****************************SignOut**************************************************/
export const signOut = (history: any | undefined): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) =>  {
  localStorage.clear();
  clearToken();
  await Cookies.remove("token");
  await Cookies.remove("role");
  console.log("Reducer----rmvtoken");
  await history.replace("/login");
  return { type: SIGN_OUT };
};
interface initState {
  user: Iuser;
  isSignOut: boolean;
}
const intialState: initState = {
  user:  {
    email: "",
    username: "",
    bio: "",
    image: "",
    role: "",
    roles: [""],
  },
  isSignOut: true,
};

export const profileReducer = (
  state = intialState,
  action: ProfileActionTypes
): initState => {
  switch (action.type) {
    case SIGN_IN:
      return { user: action.payload,isSignOut: false };
    case SIGN_OUT:
      return {...state,isSignOut:true};
    default:
      return state;
  }
};

export default profileReducer;
