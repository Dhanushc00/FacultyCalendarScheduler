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
} from "@chakra-ui/react";
import { RootState } from "../../store/store";
import { getSem, AddSem, delSem } from "../../store/semester/semesterReducer";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { Isem } from "../../store/semester/sem";
import { DatePicker } from "@material-ui/pickers";
import * as Yup from "yup";
import Cookies from "js-cookie";

function ModifySemScreen() {
  let dispatch = useDispatch();
  let toast = useToast();
  React.useEffect(() => {
    if (Cookies.get("role") == "Admin") dispatch(getSem(toast));
  }, []);
  const [show, setShow] = React.useState(false);
  const semDetails = useSelector((state: RootState) => state.sem);
  const date = new Date();
  let InitialValues: Isem = {
    SemId: "",
    startDate: String(date),
    endDate: String(date),
    semNo: "",
  };
  console.log(semDetails);
  return (
    <Box>
      <Box
        d="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontWeight="600" fontSize="large">
          SEMESTER DETAILS
        </Text>
      </Box>

      <Formik
      key="modifysemscreen"
        initialValues={InitialValues}
        onSubmit={(
          values: Isem,
          { setSubmitting, resetForm }: FormikHelpers<Isem>
        ) => {
          setSubmitting(false);
          dispatch(AddSem(values, toast));
          resetForm();
          console.log(values);
        }}
        validationSchema={Yup.object().shape({
          SemId: Yup.string()
            .test("SemId", "Enter Valid SemID", (val: any) => {
              return /^SEM_[1-9]_[1-2][0-9][0-9][0-9]$/.test(val);
            })
            .required(),
          startDate: Yup.date().default(() => new Date()),
          endDate: Yup.date()
            .required()
            .when(
              "startDate",
              (startDate: any, schema: any) =>
                startDate && schema.min(startDate)
            ),
          semNo: Yup.string().required(),
        })}
      >
        {(props: FormikProps<Isem>) => {
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
                  onClick={() => setShow(!show)}
                >
                  Add Semester
                </Button>
              </Box>
              <Table variant="unstyled" border="1px" m={2}>
                <Thead>
                  <Tr>
                    <Th>SemId</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th isNumeric>Sem No</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>
                      <FormControl
                        isInvalid={
                          Boolean(errors.SemId) && Boolean(touched.SemId)
                        }
                      >
                        <Input
                          data-testid="SemId"
                          type="string"
                          id="SemId"
                          variant="flushed"
                          value={values.SemId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="SEM_y_xxxx y-semno x-year"
                        />
                      </FormControl>
                    </Td>
                    <Td>
                      <FormControl
                        isInvalid={
                          Boolean(errors.startDate) &&
                          Boolean(touched.startDate)
                        }
                      >
                        <DatePicker
                          key="startDate"
                          label="startDate"
                          value={values.startDate}
                          onChange={(value: any) =>
                            setFieldValue("startDate", value)
                          }
                          animateYearScrolling
                        />
                      </FormControl>
                    </Td>
                    <Td>
                      <FormControl
                        isInvalid={
                          Boolean(errors.endDate) && Boolean(touched.endDate)
                        }
                      >
                        <DatePicker
                          key="endDate"
                          label="endDate"
                          value={values.endDate}
                          onChange={(value: any) =>
                            setFieldValue("endDate", value)
                          }
                          animateYearScrolling
                        />
                      </FormControl>
                    </Td>
                    <Td isNumeric>
                      <FormControl
                        isInvalid={
                          Boolean(errors.semNo) && Boolean(touched.semNo)
                        }
                      >
                        <Select
                          id="semNo"
                          placeholder="Sem No"
                          w={120}
                          m={2}
                          value={values.semNo}
                          onChange={handleChange}
                          color="gray.400"
                          variant="flushed"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </Select>
                        {/* <Input
                          type="string"
                          id="semNo"
                          value={values.semNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="email"
                        /> */}
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
          {semDetails.length == 0 ? "No Sem Details available" : null}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>SemId</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th isNumeric>Sem No</Th>
            <Th isNumeric>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(semDetails).map((q) => {
            return (
              <Tr key={q.SemId}>
                <Td>{q.SemId}</Td>
                <Td>{q.startDate}</Td>
                <Td>{q.endDate}</Td>
                <Td isNumeric>{q.semNo}</Td>
                <Td isNumeric>
                  <IconButton
                    onClick={() => dispatch(delSem(q.SemId, toast))}
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

export default ModifySemScreen;
