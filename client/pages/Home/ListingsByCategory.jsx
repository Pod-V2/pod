import React from "react";
import { useState, useEffect } from "react";
import Categories from "./components/category";
import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import Footer from "../../common/Footer";
import Header from "../../common/Header.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

/**
 * Redirect to this page upon clicking one of the category buttons from the categories component, GET the listings from the category that was drilled
 * down.
 */
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    minHeight: "100%",
  },
  media: {
    height: 240,
  },
});

const ListingsByCategory = (props) => {
  //send POST request to the backend using props.categoryName and then display?
  // GET /api/listings/
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/listing/category/${category}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(`Here is the GET request to /category/${category}`);
        console.log(data);
        console.log(Array.isArray(data));
        setListings(data);
        console.log(`Listing array is currently: ${listings}`);
      });
  }, []);

  function handleClickListing(i) {
    navigate(`/listing/details/${listings[i].listingid}`);
  }

  return (
    <div>
      <Header />
      <Container>
        {listings.map((element, i) => {
          return (
            <Card className={classes.root}>
              <CardActionArea onClick={() => handleClickListing(i)}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  src={element.img_url}
                  title={element.listing}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {element.listing}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {element.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            // <Box listingName={element.listing}>
            //   <div className="listing">
            //     <div className="listingCard">
            //       <img src={element.img_url}></img>
            //       {/* <FaRegBookmark />
            //   <FaFireAlt /> */}
            //     </div>
            //   </div>
            //   <p></p>
            //   <p></p>

            //   <Button
            //     onClick={() => {
            //       handleClickListing(i);
            //     }}
            //   >
            //     {element.listing}
            //   </Button>
            // </Box>
          );
        })}
      </Container>
    </div>
  );
};

const Text = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
`;

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
  width: fit-content;
  align-items: space-between;
  margin: auto;
  margin-top: 25px;
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, minmax(50px, 1fr));
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(50px, 1fr));
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(50px, 1fr));
  }
  @media (min-width: 2600px) {
    grid-template-columns: repeat(8, minmax(50px, 1fr));
  }
`;

const Box = styled.div`
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 14rem;
  padding-right: 5px;
  background-color: #f7f7f7;
  transition: 0.2s;
  position: relative;

  flex: 1 0 25rem;
  transition: 0.2s;

  @media (max-width: 1020px) {
  }
`;

const Button = styled.button`
  height: 1.5rem;
  margin-bottom: 1rem;
  border: none;
  color: blue;
  background-color: #f7f7f7;
`;
const PageContainer = styled.div`
background-color: #F0F0F0,
min-height: 100%
`;

export default ListingsByCategory;
