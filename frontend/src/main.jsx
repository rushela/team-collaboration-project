// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = extendTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
