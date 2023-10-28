import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "../Home/Home";
import Login from "../SignInUp/Login";
import SignUp from "../SignInUp/SignUp";
import Cart from "../Cart/Cart";
import LandingPage from "../LandingPage/LandingPage.jsx";
import Profile from '../Profile/Profile.jsx';
import { CreateListing } from "../ProductDetails/CreateListing.jsx";
import { UpdateListing } from "../ProductDetails/UpdateListing.jsx";
import { ListingDetails } from '../ProductDetails/ListingDetails.jsx';
import ListingsByCategory from "../Home/ListingsByCategory.jsx";


const Pages = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/listing/details/:id" element={<ListingDetails/>} />
          <Route path="/cart"  element={<Cart/>}/>
          <Route path="/listing/create" element={<CreateListing />} />
          <Route path="/listing/update/:id" element={<UpdateListing />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/ListingsByCategory/:category" element={<ListingsByCategory/>}/>
        </Routes>
      </Router>
    </>
  );
};

const PageContainer = styled.div`
background-color: #F0F0F0,
min-height: 100%
`;

export default Pages;
