import {
    PlusSquareIcon,
    EditIcon,
    CalendarIcon,
    SettingsIcon,
    AddIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    RepeatIcon,
  } from "@chakra-ui/icons";
  import { Box, Stack, Button, Text, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
  import React from "react";
  import { useRouteMatch, useHistory } from "react-router-dom";
  
  const Header = () => {
    let { path, url } = useRouteMatch();
    let history = useHistory();
    return (
      <Box
        bg="#F05D5E"
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
          <Button
            leftIcon={<SettingsIcon mb={0.9} />}
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
            Settings
          </Button>
        </Stack>
      </Box>
    );
  };
  
  export default Header;
  