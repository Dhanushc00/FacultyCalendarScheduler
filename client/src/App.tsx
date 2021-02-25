import * as React from "react";

import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store/store";
import AuthRoute from "./routes/AuthRoute";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthRoute />
      </ChakraProvider>
    </Provider>
  );
};
export default App;
