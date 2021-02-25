import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHomeScreen from "../screens/Admin/AdminHomeScreen";
import FacultyHomeScreen from "../screens/Faculty/FacultyHomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import { Box } from "@chakra-ui/react";
import { RootState } from "../store/store";
import Cookies from "js-cookie";
import { api, setToken } from "../store/api";

export default function Routes() {
  //const [auth, setAuth] = React.useState<null | string | any>(null);
  const val = useSelector((state: RootState) => state.profile.role);

  const [auth, setAuth] = React.useState(true);
  const [isTokenValidated, setIsTokenValidated] = React.useState(false);

  React.useEffect(() => {
    // send jwt to API to see if it's valid
    let token: any = Cookies.get("token");
    setToken(token);
    if (token) {
      api
        .post("/user/protected")
        .then((res: any) => {
          console.log("Yesssss", token);
          if (res) {
            setAuth(true);
          }
        })
        .catch((err) => {
          setAuth(false);
          Cookies.remove("token");
        })
        .then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);
  console.log(auth, val);
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/protected"
            render={({ location }) =>
              auth && isTokenValidated ? (
                val == "Faculty" ? (
                  <FacultyHomeScreen />
                ) : val == "Admin" ? (
                  <AdminHomeScreen />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location },
                    }}
                  />
                )
              ) : (
                // <SignInScreen />
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                />
              )
            }
          />
          <Route path="/login">
            <SignInScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
