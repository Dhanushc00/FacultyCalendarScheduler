import {
  Box,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  ICollapse,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAccounts } from "../../store/admin/AccountsReducer";
import { ICreateAccount } from "../../store/profile/profile";
import { RootState } from "../../store/store";
import Moment from "moment";
export default function ViewAccountsScreen() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetAccounts());
    //dispatch(GetAccounts())
  }, []);
  const state = useSelector((state: RootState) => state.accounts.users);
  console.log(state);
  return (
    <Box>
      <Table variant="simple">
        <TableCaption>Faculty and Admin Accounts</TableCaption>
        <Thead>
          <Tr>
            <Th>UserName</Th>
            <Th>Email</Th>
            <Th >Roles</Th>
            <Th isNumeric>CreatedAt</Th>
            <Th isNumeric>UpdatedAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.map((q: ICreateAccount) => {
            console.log(q.roles.includes("Faculty"));
            return (
              <Tr>
                <Td>{q.username}</Td>
                <Td>{q.email}</Td>
                <Td>
                  <>
                    {q.roles.includes("Admin") ? (
                      <Badge colorScheme="red">Admin</Badge>
                    ) : null}
                    {q.roles.includes("Faculty") ? (
                      <Badge colorScheme="green">Faculty</Badge>
                    ) : null}
                  </>
                </Td>
                <Td isNumeric>{Moment(q.createdAt).format("LLL")}</Td>
                <Td isNumeric>{Moment(q.updatedAt).format("LLL")}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
