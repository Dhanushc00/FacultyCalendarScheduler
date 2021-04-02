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
function CreatePeriods() {
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
  React.useEffect(() => {
    if (Cookies.get("role") == "Admin") dispatch(getPk(toast));
  }, []);
  const [sem, setSem] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  React.useEffect(() => {
    if (sem == "" || username == "") {
      console.log("Clearrrperiods");
      dispatch({ type: CLR_PERIODS });
    } else {
      console.log("fetchPeriod12");
      dispatch(getPeriods(sem, username, toast));
    }
  }, [sem, username]);
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
        justifyContent="space-around"
        alignItems="center"
        mt={5}
      >
        <Select
          placeholder="Select Faculty Username"
          w={"40vh"}
          value={username}
          onChange={(val) => setUsername(val.target.value)}
        >
          {pk.username.map((q: string) => (
            <option value={q}>{q}</option>
          ))}
        </Select>
        <Select
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
        <Formik
          initialValues={InitialValues}
          onSubmit={(
            values: IperiodInput,
            { setSubmitting, resetForm }: FormikHelpers<IperiodInput>
          ) => {
            setSubmitting(false);
            //let date=Moment(values.startTime).day(values.day);
            //console.log(Moment(date).format('llll'))
            dispatch(AddPeriods(values, username, sem, toast));
            //console.log(values.startTime);
            //resetForm();
          }}
          validationSchema={Yup.object().shape({
            day: Yup.string().required(),
            startTime: Yup.string().required(),
            endTime: Yup.string().required(),
            courseCode: Yup.string()
              .test("SemId", "Enter Valid SemID", (val: any) => {
                return /^[0-9][0-9]CSE[0-9][0-9][0-9]$/.test(val);
              })
              .required(),
          })}
        >
          {(props: FormikProps<IperiodInput>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
              setFieldValue,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box d="flex" justifyContent="flex-end" alignItems="center">
                  <Button
                    leftIcon={<PlusSquareIcon />}
                    colorScheme="red"
                    variant="solid"
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!(sem != "" && username != "")}
                    //onClick={() => setShow(!show)}
                  >
                    Add Period
                  </Button>
                </Box>
                <Table variant="unstyled" border="1px" m={2}>
                  <Thead>
                    <Tr>
                      <Th>Day</Th>
                      <Th>Course Code</Th>
                      <Th>Start Time</Th>
                      <Th isNumeric>End Time</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td isNumeric>
                        <FormControl
                          isInvalid={
                            Boolean(errors.day) && Boolean(touched.day)
                          }
                        >
                          <Select
                            id="day"
                            placeholder="Select WeekDay"
                            w={150}
                            m={2}
                            value={values.day}
                            onChange={handleChange}
                            color="gray.400"
                            variant="flushed"
                          >
                            {days.map((q) => (
                              <option value={q}>{q}</option>
                            ))}
                          </Select>
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl
                          isInvalid={
                            Boolean(errors.courseCode) &&
                            Boolean(touched.courseCode)
                          }
                        >
                          <Input
                            data-testid="coursecode"
                            type="string"
                            id="courseCode"
                            variant="flushed"
                            value={values.courseCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="YYCSEXXX"
                          />
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl
                          isInvalid={
                            Boolean(errors.startTime) &&
                            Boolean(touched.startTime)
                          }
                        >
                          <TimePicker
                            clearable
                            ampm={true}
                            label="Start Time"
                            id="startTime"
                            value={values.startTime}
                            onChange={(value: any) =>
                              setFieldValue("startTime", value)
                            }
                          />
                        </FormControl>
                      </Td>
                      <Td>
                        <FormControl
                          isInvalid={
                            Boolean(errors.endTime) && Boolean(touched.endTime)
                          }
                        >
                          <TimePicker
                            clearable
                            ampm={true}
                            label="End Time"
                            id="endTime"
                            value={values.endTime}
                            onChange={(value: any) =>
                              setFieldValue("endTime", value)
                            }
                          />
                        </FormControl>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </form>
            );
          }}
        </Formik>
        <Table variant="unstyled" border="1px" m={2}>
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Course Code</Th>
              <Th isNumeric>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(periods).map((q) => (
              <Tr>
                <Td>{Moment(q.startTime).format("dddd")}</Td>
                <Td>{Moment(q.startTime).format("h:mm a")}</Td>
                <Td>{Moment(q.endTime).format("h:mm a")}</Td>
                <Td>{q.courseCode}</Td>
                <Td isNumeric>
                  <IconButton
                    onClick={() =>
                      dispatch(
                        deletePeriod(
                          q.periodId,
                          q.semesterSemId,
                          q.userUsername,
                          toast
                        )
                      )
                    }
                    colorScheme="red"
                    aria-label="Search database"
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default CreatePeriods;
