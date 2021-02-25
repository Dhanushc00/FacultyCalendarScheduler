import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { clearToken } from "../../store/api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const FacultyHomeScreen = () => {
  let history = useHistory();
  return (
    <Box>
      Faculty
      <Button
        onClick={() => {
          clearToken();
          Cookies.remove("token");
          console.log("rmvtoken");
          history.push("login");
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default FacultyHomeScreen;
