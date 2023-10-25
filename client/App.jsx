import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Pages from "./pages/pageLayout/Layout";
import { AllListings } from "./pages/AllListings/AllListings.jsx";
import Login from "./pages/SignInUp/Login";
import SignUp from "./pages/SignInUp/SignUp";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

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
