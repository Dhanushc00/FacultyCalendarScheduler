import React from "react";
import { useLocation, useRouteMatch, Switch, Route } from "react-router-dom";
import CreateAccountRoute from "./CreateAccountRoute";
import EventRoute from "./EventRoute";
const AdminRoute = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch location={location}>
        <Route exact path={path} render={() => <CreateAccountRoute />} />
        <Route path={`${path}/events`} exact component={()=><EventRoute/>} />
      </Switch>
    </>
  );
};

export default AdminRoute;
