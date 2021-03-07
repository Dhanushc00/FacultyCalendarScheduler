import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch} from 'react-redux';
import {signOut} from '../../store/profile/profileReducer'
const AdminHomeScreen = () => {
  let history = useHistory();
  let dispatch =useDispatch();
  return (
    <Box>
      Admin
      <Button
        onClick={() => {
          dispatch(signOut(history))
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default AdminHomeScreen;
