import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
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
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Icredentials, VerifyCred } from "../store/profile/profileReducer";
import { useDispatch,useSelector } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
import {RootState} from '../store/store'
import Cookies from 'js-cookie'
import { hostname } from "os";
//import {useAuth} from '../routes/AuthRoute'
interface LocationState {
  from: {
    pathname: string;
  };
}

const SignInScreen = () => {
  let history = useHistory();
  let location = useLocation<LocationState>();
  //let auth:any = useAuth();
  const val:string|null = useSelector((state: RootState) => state.profile.user.role);
// React.useEffect(()=>{
//     if(Cookies.get('token')!=undefined){
//       history.push(`/${val}`)
//     }
// },[])
  let InitialValues: Icredentials = {
    email: "",
    password: "",
    role: "Faculty",
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  return (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bg="#373b44"
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
        borderRadius="20px"
      >
        <Text fontSize="2xl" fontFamily="cursive" fontWeight={600} mb={3} color="#373b44">
          SIGN IN
        </Text>
        <Formik
          initialValues={InitialValues}
          onSubmit={(
            values: Icredentials,
            { setSubmitting }: FormikHelpers<Icredentials>
          ) => {
            setSubmitting(false);
            //history.push("protected");
            let role=values.role;
            let {from} = location.state || { from: { pathname: `/protected` } };
            //history.replace(from);
            history.push('/protected')
            dispatch(VerifyCred(values));
            
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Enter email"),
            password: Yup.string().required("Enter password"),
            role: Yup.string().required(),
          })}
        >
          {(props: FormikProps<Icredentials>) => {
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
                    Boolean(errors.password) && Boolean(touched.password)
                  }
                >
                  <InputGroup size="md">
                    <InputLeftElement
                      pointerEvents="none"
                      m={2}
                      children={<LockIcon color="gray.300" />}
                    />
                    <Input
                      type={show ? "text" : "password"}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      p4="4.5rem"
                      w={300}
                      m={2}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem" d="flex">
                      {show ? (
                        <ViewOffIcon mt="1.1rem" onClick={handleClick} />
                      ) : (
                        <ViewIcon mt="1.1rem" onClick={handleClick} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(errors.role) && Boolean(touched.role)}
                >
                  <Select
                    id="role"
                    placeholder="Sign in as"
                    w={300}
                    m={2}
                    value={values.role}
                    onChange={handleChange}
                    color="gray.400"
                  >
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </Select>
                </FormControl>
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
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
