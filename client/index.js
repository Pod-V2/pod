import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import { GlobalProvider } from "./context.js";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     ///* <Provider store={store}> */
//       <App />
//     {/* </Provider> */}
//   </StrictMode>
// );

root.render(
  <GlobalProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </GlobalProvider>
)