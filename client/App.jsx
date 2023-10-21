import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Pages from "./pages/pageLayout/Layout";
import { AllListings } from "./pages/AllListings/AllListings.jsx";
import Login from "./pages/SignInUp/Login";
import SignUp from "./pages/SignInUp/SignUp";
import styled from "styled-components";

const App  = () => {

    return (
        <MainContainer>
            <Pages/>
        </MainContainer>
    )
}

const MainContainer = styled.div`
min-height: 100%,
`

export default App;