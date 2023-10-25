import React from "react";
import { useState, useEffect } from "react";
import Categories from "./components/category";
import { Navigate } from "react-router-dom";
import {BiSearch} from "react-icons/bi"
import styled from "styled-components";

/**
 * Redirect to this page upon clicking one of the category buttons from the categories component, GET the listings from the category that was drilled
 * down.
 */

const ListingsByCategory = (props) =>{
  console.log(props.categoryName);
  const [listings, setListings] = useState([]);

    return (
        <>
        <Text>
        <h1>
            Showing Listings by Category
        </h1>
        </Text>
        
        {/* <Search>
        <span>All Categories</span>
            <hr />
           <input type="text" placeholder="search"></input>
           <button>
            <BiSearch />
           </button>
        </Search> */}
        
        <p></p>
        <hr></hr>
        <Container>
        {/* <Categories /> */}
        </Container>
        <hr></hr>
        </>
    )
}

const Text = styled.div`
display: flex;
justify-content: center;
font-family: 'Montserrat', sans-serif;
`

const Container = styled.div`
display: flex;
  justify-content: space-evenly;
`





export default ListingsByCategory;