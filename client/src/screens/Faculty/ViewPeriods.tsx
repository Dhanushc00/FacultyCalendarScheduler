import React from "react";
import {
  Box,
  Text,
  useToast,
  Select,
  Button,
  Table,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  IconButton,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Iperiod,
  IperiodPK,
  IperiodInput,
} from "../../store/classperiods/periods";
import * as Yup from "yup";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { TimePicker } from "@material-ui/pickers";
import {
  getPeriods,
  getPk,
  AddPeriods,
  CLR_PERIODS,
  deletePeriod,
} from "../../store/classperiods/periodsReducer";
import Moment from "moment";
import Cookies from "js-cookie";
const ViewPeriodScreen=()=>{
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let dispatch = useDispatch();
  let toast = useToast();
  const pk = useSelector((state: RootState) => state.period.pk);
  const periods = useSelector((state: RootState) => state.period.periods);
  const username=useSelector((state:RootState)=>state.profile.user.username);
  React.useEffect(() => {
    dispatch(getPk(toast));
  }, []);
  const [sem, setSem] = React.useState<string>("");
  React.useEffect(() => {
      if(sem!="") dispatch(getPeriods(sem, username, toast));
  }, [sem]);
  const date = new Date();
  let InitialValues: IperiodInput = {
    day: "",
    startTime: "2021-03-08T17:09:01.388Z",
    endTime: "2021-03-08T17:09:01.388Z",
    courseCode: "",
  };
  //console.log(periods);
  return (
    <Box>
      <Box d="flex" justifyContent="center" alignItems="center">
        <Text fontWeight="600" fontSize="large">
          CLASS PERIODS
        </Text>
      </Box>
      <Box
        d="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        mt={5}
      >
          {"SELECT SEM ID:   "}
        <Select
            ml={5}
          id="select_sem"
          placeholder="Select Sem Id"
          w={"40vh"}
          value={sem}
          onChange={(val) => setSem(val.target.value)}
        >
          {pk.sem.map((q: string) => (
            <option value={q}>{q}</option>
          ))}
        </Select>
        {/* <Button
          onClick={() => dispatch(getPeriods(sem, username, toast))}
          colorScheme="red"
          disabled={!(sem != "" && username != "")}
        >
          SELECT
        </Button> */}
      </Box>
      <Box>
        <Table variant="unstyled" border="1px" m={2}>
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Course Code</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(periods).map((q) => (
              <Tr>
                <Td>{Moment(q.startTime).format("dddd")}</Td>
                <Td>{Moment(q.startTime).format("h:mm a")}</Td>
                <Td>{Moment(q.endTime).format("h:mm a")}</Td>
                <Td>{q.courseCode}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default ViewPeriodScreen;
