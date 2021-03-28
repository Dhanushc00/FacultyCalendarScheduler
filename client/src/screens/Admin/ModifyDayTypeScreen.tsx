import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  Text,
  FormControl,
  Input,
  Select,
  useToast,
  IconButton,
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react";
import { RootState } from "../../store/store";
import { Iday } from "../../store/Days/days";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { AddDay, delDay, getDay, toDate } from "../../store/Days/daysReducer";
import { DatePicker } from "@material-ui/pickers";
import * as Yup from "yup";
import Cookies from "js-cookie";

function ModifyDayTypeScreen() {
  let dispatch = useDispatch();
  let toast = useToast();
  React.useEffect(() => {
    if(Cookies.get('role')=='Admin')
            dispatch(getDay(toast));
  }, []);
  const [show, setShow] = React.useState(false);
  const dayDetails = useSelector((state: RootState) => state.day);
  const date = new Date();
  let InitialValues: Iday = {
    date: String(date),
    type: "",
  };
  //console.log(dayDetails);
  return (
    <Box>
      <Box
        d="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontWeight="600" fontSize="large">
          DAY TYPE DETAILS
        </Text>
      </Box>

      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Iday,
          { setSubmitting, resetForm }: FormikHelpers<Iday>
        ) => {
          setSubmitting(false);
          console.log("******")
          dispatch(AddDay(values, toast));
          resetForm();
          console.log(values);
        }}
        validationSchema={Yup.object().shape({
          date: Yup.date().required(),
          type: Yup.string().required(),
        })}
      >
        {(props: FormikProps<Iday>) => {
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
                  //onClick={handleSubmit}
                >
                  Add Day Type
                </Button>
              </Box>
              <Table variant="unstyled" border="1px" m={2} pb={2}>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>
                      <FormControl
                        isInvalid={
                          Boolean(errors.date) && Boolean(touched.date)
                        }
                      >
                        <DatePicker
                            
                          key="date"
                          label="date"
                          value={values.date}
                          onChange={(value: any) =>
                            setFieldValue("date", value)
                          }
                          animateYearScrolling
                        />
                      </FormControl>
                    </Td>

                    <Td isNumeric>
                      <FormControl
                        isInvalid={
                          Boolean(errors.type) && Boolean(touched.type)
                        }
                      >
                        <RadioGroup variant="flushed" colorScheme="red" onChange={(value)=>setFieldValue("type",value)} id="type" value={values.type} >
                          <Stack direction="row">
                            <Radio value="S">Working for staffs only</Radio>
                            <Radio value="H">Holiday</Radio>
                            <Radio value="W">Working Day</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </form>
          );
        }}
      </Formik>
      <Box py={10} />
      <Table variant="unstyled" border="1px">
        <TableCaption>
          {dayDetails.length == 0 ? "No day Details available" : null}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(dayDetails).map((q) => {
            return (
              <Tr>
                <Td>{q.date}</Td>
                <Td>{q.type=="S"?"Working for staffs only":q.type=="H"?"Holiday":q.type=="W"?"Working Day":null}</Td>
                <Td isNumeric>
                  <IconButton
                    onClick={() => dispatch(delDay(q.date, toast))}
                    colorScheme="red"
                    aria-label="Search database"
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {/* <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr> */}
        </Tfoot>
      </Table>
    </Box>
  );
}

export default ModifyDayTypeScreen;
