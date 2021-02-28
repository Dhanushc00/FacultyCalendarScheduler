import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { clearToken } from "../../store/api";
import Cookies from "js-cookie";
import { signOut } from "../../store/profile/profileReducer";
import { useHistory } from "react-router-dom";
const FacultyHomeScreen = () => {
  let history = useHistory();
  return (
    <Box>
      Faculty
      <Button
        onClick={() => {
          signOut();
          history.push("/login");
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default FacultyHomeScreen;
