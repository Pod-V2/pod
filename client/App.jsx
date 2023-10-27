import React from "react";
import "./styles/App.scss";
import Pages from "./pages/pageLayout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Pages />
      </QueryClientProvider>
    </div>
  );
};

export default App;
