import React from "react";
import {
  Box,
  Divider,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import CreateEventsScreen from "../screens/Faculty/CreateEventsScreen";
import ViewEventsScreen from "../screens/Faculty/ViewEventsScreen";
import ParticipantScreen from "../screens/Faculty/PartcipantScreen";
import Cookies from 'js-cookie';
export default function EventRoute() {
  return (
    <>
      <Tabs
        variant="line"
        colorScheme={Cookies.get('role')=='Admin'?"red":"blue"}
        d="flex"
        flexDirection="row"
        //bg="#EDE7D9"
      >
        <TabList
          flexDirection="column"
          w={"60vh"}
          h="90vh"
          //bg="blue.200"
          divider={<StackDivider borderColor="gray.200" />}
          justifyContent="center"
          alignItems="center"
          pb={"20vh"}
        >
          <Tab
            my={1}
            fontFamily="cursive"
            fontWeight="600"
            _focus={{ boxShadow: "none" }}
          >
            CREATE EVENT
          </Tab>
          <Tab
            my={1}
            fontFamily="cursive"
            fontWeight="600"
            _focus={{ boxShadow: "none" }}
          >
            VIEW ALL EVENTS
          </Tab>
          <Tab
            my={1}
            fontFamily="cursive"
            fontWeight="600"
            _focus={{ boxShadow: "none" }}
          >
            PARTICIPANT
          </Tab>
        </TabList>
        <Divider orientation="vertical" w="20" bg="blue" color="black" />
        <TabPanels>
       
          <TabPanel>
            <CreateEventsScreen />
          </TabPanel>
          <TabPanel>
            <ViewEventsScreen />
          </TabPanel>
          <TabPanel>
            <ParticipantScreen />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
