import React from "react";
import {
  Box,
  Input,
  Text,
  Button,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Badge,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  InputLeftElement,
  Checkbox,
  HStack,
  Avatar,
  AvatarBadge,
  useToast
} from "@chakra-ui/react";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { ICreateAccount } from "../../store/profile/profile";
import {
  EmailIcon,
  LockIcon,
  ViewOffIcon,
  ViewIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import {useDispatch} from 'react-redux'
import {CreateAccount} from '../../store/admin/AccountsReducer'
let InitialValues: ICreateAccount = {
  username: "",
  email: "",
  roles: [],
};

export default function CreateAccountScreen() {
  const [isAdmin, setIsAdmin] = React.useState();
  const dispatch=useDispatch();
  let toast =useToast();
  return (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="80vh"
      //bg="#D4D2D5"
    >
      <Box
        d="flex"
        flexDirection="column"
        w={500}
        h={500}
        justifyContent="center"
        alignItems="center"
        border="1px"
        borderWidth="1"
        bg="#fff"
        borderRadius="10px"
      >
        <Text
          fontSize="2xl"
          fontFamily="cursive"
          fontWeight={600}
          //mb={3}
          color="#373b44"
        >
          CREATE NEW ACCOUNT
        </Text>
        <Avatar alignSelf="center" my={5} size="lg" bg={"#373b44"}>
          {/* <AvatarBadge boxSize="1.25em" /> */}
        </Avatar>
        <Formik
          key="CreateAccount"
          initialValues={InitialValues}
          onSubmit={(
            values: ICreateAccount,
            { setSubmitting,resetForm }: FormikHelpers<ICreateAccount>
          ) => {
            setSubmitting(false);
            dispatch(CreateAccount(values,toast));
            resetForm()
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Enter email"),
            username: Yup.string().required("Enter username"),
            roles: Yup.array().required(),
          })}
        >
          {(props: FormikProps<ICreateAccount>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <FormControl
                  isInvalid={Boolean(errors.email) && Boolean(touched.email)}
                >
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      m={2}
                      children={<EmailIcon color="gray.300" />}
                    />
                    <Input
                      data-testid="email"
                      type="string"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      w={300}
                      m={2}
                      placeholder="email"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  isInvalid={
                    Boolean(errors.username) && Boolean(touched.username)
                  }
                >
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      m={3}
                      children={<ArrowForwardIcon color="gray.300" />}
                    />
                    <Input
                      data-testid="username"
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      p4="4.5rem"
                      w={300}
                      m={3}
                      placeholder="username"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.roles) && Boolean(touched.roles)}
                >
                  <HStack spacing={5} ml={5}>
                    <Text>Select role:</Text>
                    <label>
                      <Field
                        type="checkbox"
                        name="roles"
                        value="Admin"
                        mr={2}
                      />
                      {"  "}Admin
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="roles"
                        value="Faculty"
                        mr={2}
                      />
                     {"  "} Faculty
                    </label>
                  </HStack>
                </FormControl>
                <Button
                  mt={4}
                  m={2}
                  w={300}
                  bg="#373b44"
                  fontFamily="cursive"
                  fontWeight="300"
                  color="gray.100"
                  variantColor="teal"
                  isLoading={isSubmitting}
                  style={{ alignSelf: "center", justifySelf: "center" }}
                  type="submit"
                >
                  Create and send e-mail to the user
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
