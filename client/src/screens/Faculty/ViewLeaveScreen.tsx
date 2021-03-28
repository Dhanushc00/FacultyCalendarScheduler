import {
    Select,
    Table,
    TableCaption,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Box,
    Button,
    Text,
    useToast,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Checkbox,
    FormControl,
    Input,
    InputGroup,
    SimpleGrid,
    Stack,
    Textarea,
    IconButton,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../../store/store";
  import React from "react";
  import Moment from "moment";
  import { Ievent, Ieventsend } from "../../store/Events/events";
  import { ModifyLeave } from "../../utils/modifyData";
  import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
  import { DatePicker } from "@material-ui/pickers";
  import {Ileave} from '../../store/applyLeave/leave';
  import { Formik, FormikHelpers, FormikProps } from "formik";
  import {getLeave,applyLeave,delEvent,updateLeave} from '../../store/applyLeave/leaveReducer';
  import Cookies from "js-cookie";
  import * as Yup from "yup";
  import { useHistory } from "react-router-dom";
  const ViewLeaveScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef<undefined | any>();
    let dispatch = useDispatch();
    let history=useHistory();
    let toast = useToast();
    React.useEffect(() => {
      dispatch(getLeave(toast));
    }, []);
    const [isOpenA, setIsOpenA] = React.useState(false);
    const onCloseA = () => setIsOpenA(false);
    const cancelRef = React.useRef<any | undefined>();
    const leaves = useSelector((state: RootState) => state.leave);
    //console.log(events);
    const [data, setData] = React.useState<Ileave | any>();
    return (
      <>
        <AlertDialog
          isOpen={isOpenA}
          leastDestructiveRef={cancelRef}
          onClose={onCloseA}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Edit Event
              </AlertDialogHeader>
  
              <AlertDialogBody>
              <Formik
        initialValues={data}
        onSubmit={(
          values: Ileave,
          { setSubmitting, resetForm }: FormikHelpers<Ileave>
        ) => {
          setSubmitting(false);
          dispatch(updateLeave(values, toast,onCloseA));
          //history.push("protected");
        }}
        validationSchema={Yup.object().shape({
          fromdate: Yup.date().required(),
          todate: Yup.date().required(),
          leavetype: Yup.string().required(),
        })}
      >
        {(props: FormikProps<Ileave>) => {
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
              <SimpleGrid columns={1} spacing={2}>
                <FormControl
                  isInvalid={
                    Boolean(errors.leavetype) && Boolean(touched.leavetype)
                  }
                >
                  <Select
                    id="leavetype"
                    placeholder="leave type"
                    my={2}
                    variant="flushed"
                    value={values.leavetype}
                    onChange={(val) =>
                      setFieldValue("leavetype", val.target.value)
                    }
                    color="gray.500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Medical">Medical</option>
                    <option value="Duty">OnDuty</option>
                  </Select>
                </FormControl>
                <Box d="flex" flexDirection="row">
                  <FormControl
                    my={2}
                    mr={2}
                    isInvalid={
                      Boolean(errors.fromdate) && Boolean(touched.fromdate)
                    }
                  >
                    <DatePicker
                      //key="date"
                      label="fromdate"
                      value={values.fromdate}
                      onChange={(value: any) =>
                        setFieldValue("fromdate", value)
                      }
                      animateYearScrolling
                    />
                  </FormControl>
                  <FormControl
                    my={2}
                    isInvalid={
                      Boolean(errors.todate) && Boolean(touched.todate)
                    }
                  >
                    <DatePicker
                      //key="date"
                      label="todate"
                      value={values.todate}
                      onChange={(value: any) => setFieldValue("todate", value)}
                      animateYearScrolling
                    />
                  </FormControl>
                </Box>
                <Button
                  mt={4}
                  m={2}
                  w={300}
                  bg="#373b44"
                  fontFamily="cursive"
                  fontWeight="500"
                  color="gray.100"
                  variantColor="teal"
                  isLoading={isSubmitting}
                  style={{ alignSelf: "center", justifySelf: "center" }}
                  type="submit"
                >
                  Apply
                </Button>
              </SimpleGrid>
            </form>
          );
        }}
      </Formik>
              </AlertDialogBody>
  
              {/* <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseA}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={onCloseA} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter> */}
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Box d="flex" justifyContent="center" alignItems="center">
          <Text fontWeight="600" fontSize="large">
            Leave Details
          </Text>
        </Box>
  
        <Table variant="simple">
          <TableCaption>Maintain Your Leave Details Here!!</TableCaption>
          <Thead>
            <Tr>
              <Th>Leave Type</Th>
              <Th>From Date</Th>
              <Th>To Date</Th>
              <Th isNumeric>Edit</Th>
              <Th isNumeric>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(leaves).map((q: Ileave|any) => {
              return (
                <Tr>
                  <Td>{q.leavetype}</Td>
                  <Td>{Moment(q.fromdate).format("DD-MM-YYYY")}</Td>
                  <Td>{Moment(q.todate).format("DD-MM-YYYY")}</Td>
                  <Td isNumeric>
                    <Button
                      ref={finalRef}
                      onClick={() => {
                        setData(q);
                        setIsOpenA(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td isNumeric>
                    <IconButton
                      onClick={() => dispatch(delEvent(q.Leaveid, toast))}
                      colorScheme="red"
                      aria-label="Search database"
                      icon={<DeleteIcon />}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </>
    );
  };
  
  export default ViewLeaveScreen;
  