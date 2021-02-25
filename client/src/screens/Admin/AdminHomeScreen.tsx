import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { clearToken } from "../../store/api";
const AdminHomeScreen = () => {
  let history = useHistory();
  return (
    <Box>
      Admin
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

export default AdminHomeScreen;
