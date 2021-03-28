import { toUnicode } from "punycode";
import React from "react";
import { useLocation, useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import CreateAccountNav from "../navigation/CreateAccountNav";
import EventNav from "../navigation/EventNav";
import CalendarNav from '../navigation/CalendarNav';
import ApplyLeaveNav from '../navigation/ApplyLeaveNav';
const AdminRoute = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();
  return (
    <>
      <Switch location={location}>
        <Redirect exact from="/protected" to={`${path}/events`} />
        {/* <Route exact={true} path={`${path}/createaccount`} render={() => <CreateAccountNav />} /> */}
        <Route exact={true} path={`${path}/events`} render={()=><EventNav/>} />
        <Route exact={true} path={`${path}/calendar`} render={()=><CalendarNav/>} />
        <Route exact={true} path={`${path}/leave`} render={()=><ApplyLeaveNav/>} />
      </Switch>
    </>
  );
};

export default AdminRoute;
