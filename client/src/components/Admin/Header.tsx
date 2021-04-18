import {
  PlusSquareIcon,
  EditIcon,
  CalendarIcon,
  SettingsIcon,
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
  ArrowForwardIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Button,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../../store/profile/profileReducer";
import { useDispatch } from "react-redux";

const Header = () => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  return (
    <Box
      bg={Cookies.get("role") == "Admin" ? "#F05D5E" : "#809BCE"}
      d="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box d="flex" flexDirection="row" alignItems="center" ml={31}>
        <Text
          fontSize="2xl"
          color="#E7ECEF"
          fontFamily="cursive"
          fontWeight="400"
        >
          Faculty Calendar Scheduler
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
        {Cookies.get("role") == "Admin" ? (
          <Button
            onClick={() => history.push(`${path}/createaccount`)}
            leftIcon={<PlusSquareIcon mb={0.9} />}
            bg="#373b44"
            _hover={{ color: "#87898e" }}
            color="#fff"
            px={5}
            py={0}
            variant="solid"
            //rounded={"full"}
            fontFamily="cursive"
            fontSize="12"
            fontWeight="400"
          >
            Create new Account
          </Button>
        ) : (
          <Button
            onClick={() => history.push(`${path}/leave`)}
            leftIcon={<PlusSquareIcon mb={0.9} />}
            bg="#373b44"
            //_hover={{ color: "#87898e" }}
            _hover={{ color: "#000" }}
            color="#fff"
            px={5}
            py={0}
            variant="solid"
            //rounded={"2xl"}
            fontFamily="cursive"
            fontSize="12"
            fontWeight="400"
          >
            Apply Leave
          </Button>
        )}
        <Button
          onClick={() => history.push(`${path}/events`)}
          leftIcon={<EditIcon mb={0.9} />}
          bg="#373b44"
          //_hover={{ color: "#87898e" }}
          _hover={{ color: "#000" }}
          color="#fff"
          px={5}
          py={0}
          variant="solid"
          //rounded={"2xl"}
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
          variant="solid"
          //rounded={"full"}
          fontFamily="cursive"
          fontSize="12"
          fontWeight="400"
        >
          Calendar
        </Button>
        {/* <Button
          leftIcon={<TimeIcon mb={0.9} />}
          bg="#373b44"
          _hover={{ color: "#87898e" }}
          color="#fff"
          px={5}
          py={0}
          variant="solid"
          //rounded={"full"}
          fontFamily="cursive"
          fontSize="12"
          fontWeight="400"
        >
          Reminder
        </Button> */}
        <Button
          leftIcon={<ArrowForwardIcon mb={0.9} />}
          //bg="#373b44"
          //_hover={{ color: "#87898e" }}
          colorScheme='red'
          color="#fff"
          px={5}
          py={0}
          variant="solid"
          onClick={()=>dispatch(signOut(history))}
          //rounded={"full"}
          fontFamily="cursive"
          fontSize="12"
          fontWeight="400"
        >
          LogOut
        </Button>
        </Stack>
    </Box>
  );
};

export default Header;
