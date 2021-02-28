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
import { createBrowserHistory } from "history";
import { useSelector, useDispatch } from "react-redux";
import AdminHomeScreen from "../screens/Admin/AdminHomeScreen";
import FacultyHomeScreen from "../screens/Faculty/FacultyHomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import { Box, Button, chakra, Stack, Text } from "@chakra-ui/react";
import {
  CalendarIcon,
  EditIcon,
  PlusSquareIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { RootState } from "../store/store";
import { LOAD, RESTORE_TOKEN, signOut } from "../store/profile/profileReducer";
import Cookies from "js-cookie";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import AdminRoute from "./AdminRoute";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});
export default function Routes() {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const val: string | null = useSelector(
    (state: RootState) => state.profile.user.role
  );
  const state = useSelector((state: RootState) => state.profile);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  console.log(val, state);
  if (val == "Faculty") {
    return <FacultyHomeScreen />;
  }
  if (val == "Admin") {
    return (
      <>
        <Box
          bg="#F05D5E"
          d="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box d="flex" flexDirection="row" alignItems="center" ml={10}>
            <Text
              fontSize="2xl"
              color="#E7ECEF"
              fontFamily="cursive"
              fontWeight="400"
            >
              Faculty Calendar Schedular
            </Text>
          </Box>
          <Stack
            direction="row"
            spacing={8}
            align="center"
            justify="flex-end"
            pr={100}
            h={"10vh"}
          >
            <Button
              onClick={() => history.push(`${path}`)}
              leftIcon={<PlusSquareIcon mb={0.9} />}
              bg="#373b44"
              _hover={{ color: "#87898e" }}
              color="#fff"
              px={5}
              py={0}
              rounded={"full"}
              fontFamily="cursive"
              fontSize="12"
              fontWeight="400"
            >
              Create new Account
            </Button>
            <Button
              onClick={() => history.push(`${path}/events`)}
              leftIcon={<EditIcon mb={0.9} />}
              bg="#373b44"
              _hover={{ color: "#87898e" }}
              color="#fff"
              px={5}
              py={0}
              rounded={"full"}
              fontFamily="cursive"
              fontSize="12"
              fontWeight="400"
            >
              Events
            </Button>
            <Button
              onClick={() => history.push(`${path}/Calendar`)}
              leftIcon={<CalendarIcon mb={0.9} />}
              bg="#373b44"
              _hover={{ color: "#87898e" }}
              color="#fff"
              px={5}
              rounded={"full"}
              fontFamily="cursive"
              fontSize="12"
              fontWeight="400"
            >
              Calendar
            </Button>
            <Button
              leftIcon={<SettingsIcon mb={0.9} />}
              bg="#373b44"
              _hover={{ color: "#87898e" }}
              color="#fff"
              px={5}
              py={0}
              rounded={"full"}
              fontFamily="cursive"
              fontSize="12"
              fontWeight="400"
            >
              Settings
            </Button>
          </Stack>
        </Box>
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
