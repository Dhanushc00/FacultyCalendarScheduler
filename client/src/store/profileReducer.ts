import { api, setToken, clearToken } from "./api";
import Cookies from "js-cookie";
import { Dispatch } from "redux";
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

export type ProfileActionTypes = FetchProfileAction;

/*************************SignIn*********************/
export const VerifyCred = (cred: Icredentials) => async (
  dispatch: Dispatch
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
      console.log("@#@#@##");
      console.log(res.data.token);
      Cookies.set("token", res.data.token);
      setToken(res.data.token);
      delete res.data.token;
      console.log(res.data);
      dispatch({ type: UPDATE_PROFILE, payload: { ...res.data } });
    })
    .catch((err: Ierror) => {
      console.log("&*&*&*&*&*&*");
      console.log(err);
    })
    .finally(() => console.log("api/users/login request made"));
};

/**************After Sign In get details for update profile page***********************/
export const UpdateProfile = (): FetchProfileAction => {
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

  return { type: UPDATE_PROFILE, payload: { ...user } };
};

const intialState: Iuser = {
  email: "",
  username: "",
  bio: "",
  image: "",
  role: "",
  roles:null,
};

export const profileReducer = (
  state = intialState,
  action: ProfileActionTypes
): Iuser => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...action.payload };
    default:
      return state;
  }
};

export default profileReducer;
