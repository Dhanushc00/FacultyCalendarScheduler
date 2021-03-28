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
import { getPk } from "../../store/classperiods/periodsReducer";
import { RootState } from "../../store/store";
import React from "react";
import Moment from "moment";
import { Ievent, Ieventsend } from "../../store/Events/events";
import {
  createEvent,
  getEvent,
  delEvent,
  updateEvent,
} from "../../store/Events/EventReducer";
import { ModifyData } from "../../utils/modifyData";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { Formik, FormikHelpers, FormikProps } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
const ViewEventsScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<undefined | any>();
  let dispatch = useDispatch();
  let history=useHistory();
  let toast = useToast();
  const pk = useSelector((state: RootState) => state.period.pk.username);
  React.useEffect(() => {
    dispatch(getEvent(toast));
    dispatch(getPk(toast));
  }, []);
  const [isOpenA, setIsOpenA] = React.useState(false);
  const onCloseA = () => setIsOpenA(false);
  const cancelRef = React.useRef<any | undefined>();
  const events = useSelector((state: RootState) => state.events.events);
  //console.log(events);
  const [data, setData] = React.useState<Ieventsend | any>();
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
                  values: Ieventsend,
                  { setSubmitting }: FormikHelpers<Ieventsend>
                ) => {
                  console.log("Hello!@##$$$");
                  setSubmitting(false);
                  dispatch(updateEvent(values, toast, onCloseA,history));
                  //history.push("protected");
                }}
                validationSchema={Yup.object().shape({
                  startTime: Yup.date().required(),
                  endTime: Yup.date().required(),
                  EventName: Yup.string().required(),
                  Description: Yup.string(),
                  type: Yup.string().required(),
                  Location: Yup.string().required(),
                })}
              >
                {(props: FormikProps<Ieventsend>) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                    handleSubmit,
                    setFieldValue,
                    submitForm
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <SimpleGrid columns={1} spacing={2}>
                        <FormControl
                          isInvalid={
                            Boolean(errors.EventName) &&
                            Boolean(touched.EventName)
                          }
                        >
                          <InputGroup size="md">
                            {/* <InputLeftElement
                  pointerEvents="none"
                  //m={2}
                  children={<EmailIcon color="gray.300" />}
                /> */}
                            <Input
                              type="string"
                              id="EventName"
                              color="gray.500"
                              value={values.EventName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="false"
                              //w={300}
                              // m={2}
                              my={2}
                              variant="flushed"
                              placeholder="Event Name"
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl
                          isInvalid={
                            Boolean(errors.Location) &&
                            Boolean(touched.Location)
                          }
                        >
                          <InputGroup size="md">
                            {/* <InputLeftElement
                  pointerEvents="none"
                  //m={2}
                  children={<LocationIcon color="gray.300" />}
                /> */}
                            <Input
                              type="string"
                              id="Location"
                              color="gray.500"
                              value={values.Location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="false"
                              //w={300}
                              // m={2}
                              my={2}
                              variant="flushed"
                              placeholder="Location"
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl
                          isInvalid={
                            Boolean(errors.Description) &&
                            Boolean(touched.Description)
                          }
                        >
                          <Textarea
                            id="Description"
                            placeholder="Description"
                            color="gray.500"
                            variant="flushed"
                            my={2}
                            value={values.Description}
                            onChange={handleChange}
                          />
                        </FormControl>
                        <FormControl
                          isInvalid={
                            Boolean(errors.type) && Boolean(touched.type)
                          }
                        >
                          <Select
                            id="role"
                            placeholder="Event Type"
                            // w={300}
                            // m={2}
                            my={2}
                            variant="flushed"
                            value={values.type}
                            onChange={(val) =>
                              setFieldValue("type", val.target.value)
                            }
                            color="gray.500"
                          >
                            <option value="Misc">Misc</option>
                            <option value="Meeting">Meeting</option>
                            {Cookies.get("token") ? (
                              <option value="Exam">Exam</option>
                            ) : null}
                          </Select>
                        </FormControl>
                        <Box d="flex" flexDirection="row">
                          <FormControl
                            my={2}
                            mr={2}
                            isInvalid={
                              Boolean(errors.startTime) &&
                              Boolean(touched.startTime)
                            }
                          >
                            <DateTimePicker
                              //key="date"
                              label="StartTime"
                              value={values.startTime}
                              onChange={(value: any) =>
                                setFieldValue("startTime", value)
                              }
                              animateYearScrolling
                            />
                          </FormControl>
                          <FormControl
                            my={2}
                            isInvalid={
                              Boolean(errors.endTime) &&
                              Boolean(touched.endTime)
                            }
                          >
                            <DateTimePicker
                              //key="date"

                              label="EndTime"
                              value={values.endTime}
                              onChange={(value: any) =>
                                setFieldValue("endTime", value)
                              }
                              animateYearScrolling
                            />
                          </FormControl>
                        </Box>
                        <Modal
                          onClose={() => {
                            onClose();
                          }}
                          //finalFocusRef={btnRef}
                          isOpen={isOpen}
                          scrollBehavior={"inside"}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Select Users</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Stack direction="column">
                                {pk.map((q) => {
                                  return (
                                    <Checkbox
                                      id="Participants"
                                      name={"Participants"}
                                      defaultChecked={values.Participants.includes(
                                        q
                                      )}
                                      value={q}
                                      onChange={handleChange}
                                    >
                                      {q}
                                    </Checkbox>
                                  );
                                })}
                              </Stack>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                variant="ghost"
                                bg="green.300"
                                ml={5}
                                color="#fff"
                                onClick={onClose}
                              >
                                Add
                              </Button>
                              <Button
                                onClick={() => {
                                  onClose();
                                  setFieldValue("Participants", []);
                                }}
                              >
                                Clear
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                        <Button
                          leftIcon={<AddIcon />}
                          colorScheme="green"
                          variant="solid"
                          w={40}
                          //fontSize="sm"
                          //ref={btnRef}
                          onClick={onOpen}
                        >
                          Add Users
                        </Button>
                        <Box>
                          {values.Participants.map((q: any) => {
                            return (
                              <Badge variant="solid" colorScheme="blue" mr={2}>
                                {q}
                              </Badge>
                            );
                          })}
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
                          //onClick={()=>submitForm()}
                          style={{ alignSelf: "center", justifySelf: "center" }}
                          type="submit"
                        >
                          UPDATE
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
          Events created by you
        </Text>
      </Box>

      <Table variant="simple">
        <TableCaption>Events as a creator</TableCaption>
        <Thead>
          <Tr>
            <Th>Event Name</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th isNumeric>View / Edit</Th>
            <Th isNumeric>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((q: Ievent | any) => {
            return (
              <Tr>
                <Td>{q.EventName}</Td>
                <Td>{Moment(q.startTime).format("lll")}</Td>
                <Td>{Moment(q.endTime).format("lll")}</Td>
                <Td isNumeric>
                  <Button
                    ref={finalRef}
                    onClick={() => {
                      setData(ModifyData(q));
                      setIsOpenA(true);
                    }}
                  >
                    View/Edit
                  </Button>
                </Td>
                <Td isNumeric>
                  <IconButton
                    onClick={() => dispatch(delEvent(q.EventId, toast))}
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

export default ViewEventsScreen;
