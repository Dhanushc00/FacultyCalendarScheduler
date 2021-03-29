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
} from "../../store/Events/EventReducer";
import { ModifyData } from "../../utils/modifyData";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { Formik, FormikHelpers, FormikProps } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
const ParticipantScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef<undefined | any>();
  let dispatch = useDispatch();
  let toast = useToast();
  //const pk = useSelector((state: RootState) => state.period.pk.username);
  React.useEffect(() => {
    dispatch(getEvent(toast));
    //dispatch(getPk(toast));
  }, []);
  const [isOpenA, setIsOpenA] = React.useState(false);
  const onCloseA = () => setIsOpenA(false);
  const cancelRef = React.useRef<any | undefined>();
  const events = useSelector((state: RootState) => state.events.participant);
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
              Event Details
            </AlertDialogHeader>

            <AlertDialogBody>
              <Formik
                initialValues={data}
                onSubmit={(
                  values: Ieventsend,
                  { setSubmitting }: FormikHelpers<Ieventsend>
                ) => {
                  setSubmitting(false);
                  //dispatch(createEvent(values,toast))
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
                            <Input
                              isReadOnly
                              type="string"
                              id="EventName"
                              color="gray.500"
                              value={values.EventName}
                              onBlur={handleBlur}
                              autoComplete="false"
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
                            <Input
                              isReadOnly
                              type="string"
                              id="Location"
                              color="gray.500"
                              value={values.Location}
                              onBlur={handleBlur}
                              autoComplete="false"
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
                            isReadOnly
                            id="Description"
                            placeholder="Description"
                            color="gray.500"
                            variant="flushed"
                            my={2}
                            value={values.Description}
                          />
                        </FormControl>
                        <FormControl
                          isInvalid={
                            Boolean(errors.type) && Boolean(touched.type)
                          }
                        >
                          <Input
                            isReadOnly
                            type="string"
                            id="type"
                            color="gray.500"
                            value={values.type}
                            onBlur={handleBlur}
                            autoComplete="false"
                            my={2}
                            variant="flushed"
                            placeholder="Location"
                          />
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

                              disabled={true}
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

                              disabled={true}
                              label="EndTime"
                              value={values.endTime}
                              onChange={(value: any) => console.info("")}
                              animateYearScrolling
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          {"Participants: "}
                          {values.Participants.map((q: any) => {
                            return (
                              <Badge variant="solid" colorScheme="blue" mr={2}>
                                {q}
                              </Badge>
                            );
                          })}
                        </Box>
                      </SimpleGrid>
                    </form>
                  );
                }}
              </Formik>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseA}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box d="flex" justifyContent="center" alignItems="center">
        <Text fontWeight="600" fontSize="large">
          Participant
        </Text>
      </Box>

      <Table variant="simple">
        <TableCaption>Participant</TableCaption>
        <Thead>
          <Tr>
            <Th>Event Name</Th>
            <Th>Creator</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th isNumeric>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((q: Ievent | any) => {
            return (
              <Tr>
                <Td>{q.EventName}</Td>
                <Td>{q.creator}</Td>
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
                    View
                  </Button>
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

export default ParticipantScreen;
