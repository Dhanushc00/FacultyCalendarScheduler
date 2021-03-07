import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SignInScreen from "../screens/SignInScreen";
import Cookies from "js-cookie";
import RoleRoute from "./RoleRoute";

const Routes = () => {
  const [token, setToken] = React.useState<string | null | undefined>(
    undefined
  );
  const isSignIn: boolean = useSelector(
    (state: RootState) => !state.profile.isSignOut
  );

  console.log(Cookies.get("token"));
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="login" />
            <Route
              //exact={true}
              path="/login"
              render={() => <SignInScreen />}
            />
            <Route
              //exact={true}
              path="/protected"
              render={({ location }) => (isSignIn && <RoleRoute />)}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};
export default Routes;
