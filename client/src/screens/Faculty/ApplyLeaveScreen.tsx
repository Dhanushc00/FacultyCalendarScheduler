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
import { Ileave, Ileavesend } from "../../store/applyLeave/leave";
import { applyLeave } from "../../store/applyLeave/leaveReducer";
import { RootState } from "../../store/store";
import * as Yup from "yup";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import eventAnim from "../../assets/Event_LF.json";
import Cookies from "js-cookie";
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

  const btnRef = React.useRef<any | undefined>();
  const date = new Date();
  let InitialValues: Ileavesend = {
    fromdate: String(date),
    todate: String(date),
    leavetype: "Normal",
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
          values: Ileavesend,
          { setSubmitting, resetForm }: FormikHelpers<Ileavesend>
        ) => {
          setSubmitting(false);
          dispatch(applyLeave(values, toast));
          resetForm();
          //history.push("protected");
        }}
        validationSchema={Yup.object().shape({
          fromdate: Yup.date().required(),
          todate: Yup.date().required(),
          leavetype: Yup.string().required(),
        })}
      >
        {(props: FormikProps<Ileavesend>) => {
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
                    <option data-testid='Normal' value="Normal">Normal</option>
                    <option data-testid='Medical' value="Medical">Medical</option>
                    <option data-testid='OnDuty' value="Duty">OnDuty</option>
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
      <Lottie options={defaultOptions} height={250} width={250} />
    </Box>
  );
}
