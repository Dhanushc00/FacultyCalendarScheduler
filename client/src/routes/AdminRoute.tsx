import { toUnicode } from "punycode";
import React from "react";
import { useLocation, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import CreateAccountRoute from "./CreateAccountRoute";
import EventRoute from "./EventRoute";
const AdminRoute = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch location={location}>
        <Redirect exact from="/protected" to={`${path}/createaccount`} />
        <Route exact={true} path={`${path}/createaccount`} render={() => <CreateAccountRoute />} />
        <Route exact={true} path={`${path}/events`} render={()=><EventRoute/>} />
      </Switch>
    </>
  );
};

export default AdminRoute;
