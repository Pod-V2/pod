import React, { useEffect, useState } from "react";
import { CardContent, FormControl, FormLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { ListingForm } from "./components/ListingForm.jsx";
import PrimarySearchAppBar from "../../common/Header.jsx";

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const CreateListing = (props) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{m: 1}} flexDirection="column" display="flex" alignItems="center" justifyContent="center">
        <Box sx={{m:1}}>
          <h1>Create A New Listing</h1>
        </Box>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <ListingForm imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default CreateListing;
