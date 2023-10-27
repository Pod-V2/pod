import React, { useEffect, useState } from "react";
import ListingInputsImage from "./components/ListingInputsImage.jsx";
import { CardContent, FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { ListingForm } from "./components/ListingForm.jsx";
import PrimarySearchAppBar from "../../common/Header.jsx";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { CardActions, CardMedia } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { ListingText } from "./components/ListingText";
/**
 * TODO
 * - [ ] Cancel button for listing edit
 * - [ ] Listing edit form must update instead of create new listing
 * - [ ] Populate image URL of current image into form
 */

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const UpdateListing = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  // Toggle in edit status
  const handleEdit = () => {
    if (!edit){
      setEdit(true);
    }
    // Save the changes
    else {

    }
  }

  /**
   * Handle delete button
   */

  // Fetch listing data
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetch(`http://localhost:3000/api/listing/id/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setImageUrl(res.img_url);
          return res;
        }),
  });

  if (isPending) {
    return (
      <>
        <PrimarySearchAppBar />
        <div>'Loading...'</div>
      </>
    );
  }
  if (error)
    return "An error has occurred in fetching listings: " + error.message;

  return (
    <>
      <PrimarySearchAppBar />
      <Box
        sx={{ m: 1 }}
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ m: 1 }}>
          <h1>Listing Update</h1>
        </Box>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            src={data.img_url} 
            alt="Listing Image"
            style={{maxWidth: '400px', maxHeight: '600px'}}
          >
          </CardMedia>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {!edit ? 
            <>
            <ListingText data={data}></ListingText>
            <CardActions>
              <Button size="small" color="primary">
                Delete
              </Button>
              <Button size="small" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            </CardActions>
            </>
            : <ListingForm imageUrl={imageUrl} setImageUrl={setImageUrl} listingData={data} />
            }
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UpdateListing;
