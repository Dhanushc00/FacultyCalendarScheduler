import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector, useDispatch } from "react-redux";
import AdminHomeScreen from "../screens/Admin/AdminHomeScreen";
import FacultyHomeScreen from "../screens/Faculty/FacultyHomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import { Box } from "@chakra-ui/react";
import { RootState } from "../store/store";
import { LOAD, RESTORE_TOKEN } from "../store/profile/profileReducer";
import Cookies from "js-cookie";
import RoleRoute from "./RoleRoute";

export default function Routes() {
  //let location=useLocation();
  const val: string | null = useSelector(
    (state: RootState) => state.profile.user.role
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.profile.isLoading
  );
  const Token: null | string = useSelector(
    (state: RootState) => state.profile.userToken
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const bootstrap = async () => {
      let usrToken;
      try {
        usrToken = await Cookies.get("token");
      } catch (e) {
        dispatch({ type: LOAD });
      }
      dispatch({ type: RESTORE_TOKEN, payload: usrToken });
      //history.push('protected')
      createBrowserHistory().push("/protected");
      console.log("ffff");
      //window.location.reload();
    };
    bootstrap();
  }, []);
  let tkn = Cookies.get("token");
  console.log(Cookies.get("token"), Token);

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <SignInScreen />
            </Route>
            <Route
              path="/protected"
              render={({ location }) => {
                if(isLoading){
                  return <h1>Loading</h1>
                }
                if (tkn != undefined) {
                  return <RoleRoute/>
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}
