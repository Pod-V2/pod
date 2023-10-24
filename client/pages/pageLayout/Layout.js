import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import Home from "../Home/Home"
import Login from "../SignInUp/Login";
import SignUp from "../SignInUp/SignUp";
import AllListings from "../AllListings/AllListings.jsx";
import Cart from "../Cart/Cart";
import LandingPage from "../LandingPage/LandingPage.jsx";
import { ProductDetails } from "../ProductDetails/ProductDetails.jsx";
import ListingsByCategory from "../Home/ListingsByCategory.jsx";


const Pages = () => {

    const Page = () => {
        return (
            <PageContainer>
                <Header />
                <Outlet />
                <Footer />
            </PageContainer>
        )
    }


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path ="/home" element={<Home />} />
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path ='/listing' element={<AllListings/>}/>
          <Route path ='/listing/create' element={<ProductDetails/>}/>
          <Route path="/cart"  element={<Cart/>}/>
          <Route path="/ListingsByCategory" element={<ListingsByCategory/>}/>
        </Routes>
      </Router>
    </>
  )
}


const PageContainer = styled.div`
background-color: #F0F0F0;
`

export default Pages;
