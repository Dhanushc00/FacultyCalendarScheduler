import React from "react";
import { useLocation, useRouteMatch,Switch,Route } from "react-router-dom";
import CreateAccountScreen from '../screens/Admin/CreateAccountScreen';
import EventScreen from '../screens/Faculty/EventsScreen'
import CalendarScreen from "../screens/Faculty/CalendarScreen";
import { Tabs, TabList, StackDivider, Tab, Divider, TabPanels, TabPanel } from "@chakra-ui/react";
import ViewAccountsScreen from "../screens/Admin/ViewAccountsScreen";
const CreateAccountRoute = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();

  return (
    <>
        <Tabs variant="solid-rounded" colorScheme="red" d="flex" flexDirection="row" bg="#EDE7D9">
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
          <Tab my={1} fontFamily="cursive" fontWeight="600">CREATE NEW ACCOUNT</Tab>
          <Tab my={1} fontFamily="cursive" fontWeight="600">VIEW ACCOUNTS</Tab>
        </TabList>
          <Divider orientation="vertical" w="20" bg="blue" color="black"/>
        <TabPanels>
          <TabPanel>
            <CreateAccountScreen/>
          </TabPanel>
          <TabPanel>
            <ViewAccountsScreen/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CreateAccountRoute;
