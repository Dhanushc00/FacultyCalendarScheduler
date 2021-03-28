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
import ApplyLeave from '../screens/Faculty/ApplyLeaveScreen';
import ViewLeave from '../screens/Faculty/ViewLeaveScreen';
  import Cookies from "js-cookie";
  
  function CalendarNav() {
    return (
      <>
        <Tabs
          variant="line"
          colorScheme={Cookies.get('role')=='Admin'?"red":"blue"}
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
            <Tab my={1} fontFamily="cursive" fontWeight="600" _focus={{ boxShadow: "none" }}>
              APPLY LEAVE
            </Tab>
            <Tab my={1} fontFamily="cursive" fontWeight="600" _focus={{ boxShadow: "none" }}>
              VIEW LEAVES
            </Tab>
          </TabList>
       
          <TabPanels>
            <TabPanel _focus={{boxShadow:'none'}}>
              <ApplyLeave/>
            </TabPanel>
            <TabPanel _focus={{boxShadow:'none'}}>
              <ViewLeave/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }
  
  export default CalendarNav;
  