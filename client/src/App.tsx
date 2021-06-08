import * as React from "react";

import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AuthRoute from "./routes/AuthRoute";
import { Global, css } from "@emotion/react";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
// const GlobalStyles = css`
//   /*
//     This will hide the focus indicator if the element receives focus    via the mouse,
//     but it will still show up on keyboard focus.
//   */
//   .js-focus-visible :focus:not([data-focus-visible-added]) {
//     outline: 0;
//     box-shadow: none;
//   }
// `;
//const theme = extendTheme({ colors });
export const theme = extendTheme({
  components: {
    Tab: { baseStyle: { _focus: { boxShadow: "none", outline: "none" } } },
    Button: { baseStyle: { _focus: { boxShadow: "none", outline: "none" } } },
  },
  colors,
});
const App = () => {
  return (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AuthRoute />
          </MuiPickersUtilsProvider>
        </ChakraProvider>
    </Provider>
  );
};
export default App;
