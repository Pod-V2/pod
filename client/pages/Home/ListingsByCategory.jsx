import React from "react";
import { useState, useEffect } from "react";
import Categories from "./components/category";
import { Navigate, useParams } from "react-router-dom";
import {BiSearch} from "react-icons/bi"
import styled from "styled-components";

/**
 * Redirect to this page upon clicking one of the category buttons from the categories component, GET the listings from the category that was drilled
 * down.
 */

const ListingsByCategory = (props) =>{
  //send POST request to the backend using props.categoryName and then display?
    // GET /api/listings/
    const { category } = useParams();
    const [listings, setListings] = useState([]);

    useEffect(()=> {
      fetch(`/api/listing/category/${category}`)
      .then ((data => data.json()))
      .then ((data) => {
        console.log(`Here is the GET request to /category/${category}: ${data}`)
        console.log(Array.isArray(data))
        setListings(data)
        console.log(`Listing array is currently: ${listings}`)
      })
    }, [])
    

    return (
        <Container>
          {
            listings.map((element, i) => {

             return <Box listingName={element.listing}>
    <         div className="listing">
           <div className="listingCard">
              <img></img>
              {/* <FaRegBookmark />
              <FaFireAlt /> */}

          </div>
      </div>
      <p></p>
      <p></p>
      
      <Button>{element.listing}</Button>
  </Box>
})
          }
        
        </Container>

    )
}

const Text = styled.div`
display: flex;
justify-content: center;
font-family: 'Montserrat', sans-serif;
`

const Container = styled.div`
display: grid;
justify-content: center;
  grid-template-columns: repeat(4, minmax(50px, 1fr));
  grid-gap: 5rem;
  width: fit-content;
align-items: space-between;
  @media(max-width: 1020px) {
    display : grid;
    grid-template-columns: repeat(2, minmax(50px, 1fr));
}
`

const Box = styled.div`
height : 10rem;
display: flex;
flex-direction: column;
justify-content: center;
width : 14rem;
padding-right: 5px;
background-color : #F7F7F7;
transition: 0.2s;
position: relative;

flex: 1 0 25rem;
transition: 0.2s;

@media(max-width: 1020px) {
  
}`

const Button = styled.button`
height: 1.5rem;
margin-bottom: 1rem;
border: none;
color: blue;
background-color: #F7F7F7;
`





export default ListingsByCategory;