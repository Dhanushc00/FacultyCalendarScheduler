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
  BellIcon,
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Avatar,
  AvatarBadge,
  Badge,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { RootState } from "../../store/store";
import { signOut } from "../../store/profile/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import { getnotification } from "../../store/notification/notification";
import moment from "moment";
const Header = () => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  let toast = useToast();
  const initialFocusRef = React.useRef();
  React.useEffect(() => {
    dispatch(getnotification(toast));
  }, []);
  const rem = useSelector((state: RootState) => state.rem);
  console.log(rem);
  let date=new Date()
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
        <Popover
          trigger="hover"
          size="full"
          autoFocus={true}
          initialFocusRef={initialFocusRef}
        >
          <PopoverTrigger>
            <Button
              onClick={() => dispatch(getnotification(toast))}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _pressed={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              m={0}
              p={0}
            >
              <Avatar
                onClick={() => console.info("not")}
                _hover={{ color: "#87898e" }}
                icon={<BellIcon _hover={{ color: "#87898e" }} color="#fff" />}
                bg="#373b44"
              >
                <AvatarBadge
                  boxSize="1.25em"
                  bg="green.500"
                  color="#fff"
                  mb={9}
                  border="0"
                  fontSize="13"
                >
                  {Object.keys(rem).length}
                </AvatarBadge>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="2xl" maxW="max-content">
              <PopoverArrow />
              <PopoverHeader color="#87898e" d="flex" alignItems="center">
                Notifications <BellIcon ml={1} color="#87898e" />
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <>
                {Object.keys(rem).length===0?<Text w="full" pr="140">
                    {"No notifications !!                 "}
                </Text>
                  :Object.values(rem).map((q) => {
                    console.log(q);
                    return (
                      <Box
                        d="flex"
                        alignItems="center"
                        w="full"
                        maxW="full"
                      >
                        {/* {moment(date).subtract(1, "hours").isBefore(q.time) ? ( */}
                          <Box color="green.300" mr={2}>
                            ●
                          </Box>
                        {/* ) : null} */}
                        <Box
                          key={q.time + q.title}
                          borderBottom="0.5px"
                          borderBottomColor="#000"
                          fontSize="12"
                          d="flex"
                          pr={5}
                          w="full"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text color="#5e6066" fontFamily="cursive">
                            {`${q.title} event`}
                          </Text>
                          <Text ml={10}>{moment(q.time).format("lll")}</Text>
                        </Box>
                      </Box>
                    );
                  })}
                </>
              </PopoverBody>
              <PopoverFooter color="#87898e" fontSize="14">
                View your notifications here!
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
        <Button
          leftIcon={<ArrowForwardIcon mb={0.9} />}
          //bg="#373b44"
          //_hover={{ color: "#87898e" }}
          colorScheme="red"
          color="#fff"
          px={5}
          py={0}
          variant="solid"
          onClick={() => dispatch(signOut(history))}
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
