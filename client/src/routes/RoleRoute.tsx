import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminHomeScreen from "../screens/Admin/AdminHomeScreen";
import FacultyHomeScreen from "../screens/Faculty/FacultyHomeScreen";
import { Box, Button, chakra, Stack, Text } from "@chakra-ui/react";
import { RootState } from "../store/store";
import Cookies from "js-cookie";
import AdminRoute from "./AdminRoute";
import AdminHeader from "../components/Admin/Header";
import {LocationState} from '../store/utils'

export default function Routes() {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  let location = useLocation();
  // const val: string | null = useSelector(
  //   (state: RootState) => state.profile.user.role
  // );
  const [role,setRole]=React.useState(location.state);
  React.useEffect(()=>{
      setRole(Cookies.get('role'));
  },[])
  const state = useSelector((state: RootState) => state.profile);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  //console.log(val, state);
  if (role == "Faculty") {
    return <><FacultyHomeScreen /></>;
  }
  if (role == "Admin") {
    return (
      <>
        <AdminHeader />
        <AdminRoute />
        <AdminHomeScreen />
      </>
    );
  }
  return (
    <>
      <h1>Unauthorised access !!</h1>
    </>
  );
}
