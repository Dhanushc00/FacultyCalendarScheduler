import { toUnicode } from "punycode";
import React from "react";
import { useLocation, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import CreateAccountNav from "../navigation/CreateAccountNav";
import EventNav from "../navigation/EventNav";
import CalendarNav from '../navigation/CalendarNav';
const AdminRoute = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch location={location}>
        <Redirect exact from="/protected" to={`${path}/createaccount`} />
        <Route exact={true} path={`${path}/createaccount`} render={() => <CreateAccountNav />} />
        <Route exact={true} path={`${path}/events`} render={()=><EventNav/>} />
        <Route exact={true} path={`${path}/calendar`} render={()=><CalendarNav/>} />
      </Switch>
    </>
  );
};

export default AdminRoute;
