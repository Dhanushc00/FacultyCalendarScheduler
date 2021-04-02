import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {theme} from './App'
import "@testing-library/jest-dom/extend-expect";

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </ChakraProvider>
  </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }