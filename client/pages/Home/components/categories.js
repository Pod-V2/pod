import React from "react";
import { useState, useEffect } from "react";
import Category from "./category";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Categories = () => {
/**
   * Rather than having numbers, the state should be an array of categories that then generates a different button text for each Category component.
   * Each button text would also need to be saved and used for future requests: For example, when clicking "Book," that needs to be passed in as a string 
   * to the backend, so that the backend knows to use "Book" as the category SQL query. Then it would return all the listings that fall under the "Book"
   * category as a response, which we would then use to render the listing page in a flexible manner. So I think the best way to do this is to apply the
   * useEffect hook making a get request to /api/categories to hit the getAllCategories middleware, then put all of those in a state array and map it
   * to components
  */
const [category, setCategory] = useState([]);
const navigate = useNavigate();
//handleClick to be put in the button below to redirect to the specific page. This is working correctly.
function handleClickCategory(i){
  navigate(`/ListingsByCategory/${category[i]}`);
}

useEffect(()=> {
  fetch('/api/categories')
  .then ((data => data.json()))
  .then ((data) => {
    console.log(`Here is the GET request to /categories: ${data}`)
    console.log(Array.isArray(data))
    setCategory(data)
    console.log(`Category array is currently: ${category}`)
  })
}, [])

//Pulled the category component logic into this file for easier/cleaner implementation.

return (
    <Container>
        
    {
      category.map((element, i) => {
        /**
         * Now that the logic for generating a box based on each category in the database has been created, each box's button now needs a unique handleClick
         * handler. My logic was as follows: each handleClick will redirect to the same one page, but we will also drill down 'element' (which will be a string
         * that is the category name). Then. on the listing page, send a GET request that makes a SQL query using the category name to pull all listings
         * under that category (done via backend). Afterwards we can just add logic for displaying said listings. So we might need a middleware like
         * getAllListingsByCategory or something.
         */

        return <Box categoryName={element}>
          <div className="category">
                <div className="categoryCard">
                    <img></img>
                    {/* <FaRegBookmark />
                    <FaFireAlt /> */}

                </div>
            </div>
            <p></p>
            <p></p>
            
            <Button onClick={() => {handleClickCategory(i)}}>{element}</Button>
        </Box>
      })
      
        // category.map((ct, i) => {
        //   return  <Category ct={ct} key={i} />
        // })
    }
    </Container>
)

}

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

export default Categories;