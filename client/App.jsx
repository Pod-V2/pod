import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import Pages from "./pages/pageLayout/Layout";
import { AllListings } from "./pages/AllListings/AllListings.jsx";
import Login from "./pages/SignInUp/Login";
import SignUp from "./pages/SignInUp/SignUp";
import styled from "styled-components";
import { useState } from 'react';

const [categories, setCategories] = useState([]);



const App  = () => {
  return (
    <div>
      <Pages/>
    </div>
  )
}


export default App;