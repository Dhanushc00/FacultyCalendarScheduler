import {
  Tabs,
  TabList,
  StackDivider,
  Tab,
  Divider,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import ModifySemScreen from "../screens/Admin/ModifySemScreen";
import ModifyDayTypeScreen from "../screens/Admin/ModifyDayTypeScreen";
import CalendarScreen from "../screens/Faculty/CalendarScreen";
import CreatePeriods from "../screens/Admin/CreatePeriods";
import Cookies from "js-cookie";

function CalendarNav() {
  let isAdmin = Cookies.get("role") == "Admin";
  return (
    <>
      <Tabs
        variant="line"
        colorScheme={Cookies.get("role") == "Admin" ? "red" : "blue"}
        d="flex"
        flexDirection="row"
        _focus={{ boxShadow: "none" }}
        //bg="#EDE7D9"
      >
        <TabList
          flexDirection="column"
          w={"60vh"}
          h="90vh"
          //bg="blue.200"
          //divider={<StackDivider w="1" borderColor="gray.200" />}
          justifyContent="center"
          alignItems="center"
          pb={"20vh"}
          _focus={{ boxShadow: "none" }}
        >
          <Tab
            my={1}
            fontFamily="cursive"
            fontWeight="600"
            _focus={{ boxShadow: "none" }}
          >
            CALENDAR
          </Tab>
          {isAdmin ? (
            <Tab
              my={1}
              fontFamily="cursive"
              fontWeight="600"
              _focus={{ boxShadow: "none" }}
            >
              SEMESTER DETAILS
            </Tab>
          ) : null}
          {isAdmin ? (
            <Tab
              my={1}
              fontFamily="cursive"
              fontWeight="600"
              _focus={{ boxShadow: "none" }}
            >
              EDIT DAY TYPE
            </Tab>
          ) : null}
          {isAdmin ? (
            <Tab
              my={1}
              fontFamily="cursive"
              fontWeight="600"
              _focus={{ boxShadow: "none" }}
            >
              EDIT CLASS PERIODS
            </Tab>
          ) : null}
        </TabList>

        <TabPanels>
          <TabPanel _focus={{ boxShadow: "none" }}>
            <CalendarScreen />
          </TabPanel>
          {isAdmin ? (
            <TabPanel>
              <ModifySemScreen />
            </TabPanel>
          ) : null}
          {isAdmin ? (
            <TabPanel>
              <ModifyDayTypeScreen />
            </TabPanel>
          ) : null}
          {isAdmin ? (
            <TabPanel>
              <CreatePeriods />
            </TabPanel>
          ) : null}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CalendarNav;
