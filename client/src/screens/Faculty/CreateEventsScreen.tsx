import {
  EmailIcon,
  LockIcon,
  ViewOffIcon,
  ViewIcon,
  AddIcon,
} from "@chakra-ui/icons";
import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Select,
  Button,
  Textarea,
  Box,
  SimpleGrid,
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
  Radio,
  Stack,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import { Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ievent, Ieventsend } from "../../store/Events/events";
import { getPk } from "../../store/classperiods/periodsReducer";
import { createEvent } from "../../store/Events/EventReducer";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import eventAnim from "../../assets/Event_LF.json";
import Cookies from "js-cookie";
import { Portal } from "@material-ui/core";
export default function EventsScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: eventAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  let dispatch = useDispatch();
  let toast = useToast();
  const state = useSelector((state: RootState) => state);
  //console.log(state);
  const pk = useSelector((state: RootState) => state.period.pk.username);
  React.useEffect(() => {
    dispatch(getPk(toast));
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<any | undefined>();
  let InitialValues: Ieventsend = {
    startTime: "2021-03-08T17:09:01.388Z",
    endTime: "2021-03-08T17:09:01.388Z",
    EventName: "",
    Description: "",
    type: "Misc",
    Location: "",
    Participants: [],
  };
  return (
    <Box
      d="flex"
      justifyContent="space-around"
      flexDirection="row"
      alignItems="center"
      h="80vh"
    >
      <Formik
        initialValues={InitialValues}
        onSubmit={(
          values: Ieventsend,
          { setSubmitting, resetForm }: FormikHelpers<Ieventsend>
        ) => {
          setSubmitting(false);
          dispatch(createEvent(values, toast));
          resetForm();
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
                    Boolean(errors.EventName) && Boolean(touched.EventName)
                  }
                >
                  <InputGroup size="md">
                    {/* <InputLeftElement
                  pointerEvents="none"
                  //m={2}
                  children={<EmailIcon color="gray.300" />}
                /> */}
                    <Input
                      data-testid="EventName"
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
                    Boolean(errors.Location) && Boolean(touched.Location)
                  }
                >
                  <InputGroup size="md">
                    {/* <InputLeftElement
                  pointerEvents="none"
                  //m={2}
                  children={<LocationIcon color="gray.300" />}
                /> */}
                    <Input
                      data-testid="Location"
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
                    Boolean(errors.Description) && Boolean(touched.Description)
                  }
                >
                  <Textarea
                    data-testid="Description"
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
                  isInvalid={Boolean(errors.type) && Boolean(touched.type)}
                >
                  <Select
                    data-testid="role"
                    id="role"
                    placeholder="Event Type"
                    // w={300}
                    // m={2}
                    my={2}
                    variant="flushed"
                    value={values.type}
                    onChange={(val) => setFieldValue("type", val.target.value)}
                    color="gray.500"
                  >
                    <option value="Misc">Misc</option>
                    <option value="Meeting">Meeting</option>
                    {Cookies.get("role") == "Admin" ? (
                      <option value="Exam">Exam</option>
                    ) : null}
                  </Select>
                </FormControl>
                <Box d="flex" flexDirection="row">
                  <FormControl
                    my={2}
                    mr={2}
                    isInvalid={
                      Boolean(errors.startTime) && Boolean(touched.startTime)
                    }
                  >
                    <DateTimePicker
                      //key="date"
                      id="st"
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
                      Boolean(errors.endTime) && Boolean(touched.endTime)
                    }
                  >
                    <DateTimePicker
                      //key="date"
                      id="et"
                      label="EndTime"
                      value={values.endTime}
                      onChange={(value: any) => setFieldValue("endTime", value)}
                      animateYearScrolling
                    />
                  </FormControl>
                </Box>
                <Modal
                  onClose={() => {
                    onClose();
                    setFieldValue("Participants", []);
                  }}
                  finalFocusRef={btnRef}
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
                              defaultChecked={values.Participants.includes(q)}
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
                        Close
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
                  ref={btnRef}
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
                  style={{ alignSelf: "center", justifySelf: "center" }}
                  type="submit"
                >
                  SUBMIT
                </Button>
              </SimpleGrid>
            </form>
          );
        }}
      </Formik>
      <Lottie options={defaultOptions} height={250} width={250} />
    </Box>
  );
}
