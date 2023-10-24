import React, { useEffect, useState } from "react";
import ListingInputsImage from "./components/ListingInputsImage.jsx";
import { CardContent, FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { ListingForm } from "./components/ListingForm.jsx";

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const ProductDetails = (props) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card sx={{ maxWidth: 600 }}>
      <h1>Create a new listing:</h1>
        <CardContent>
          <ListingForm imageUrl={imageUrl} setImageUrl={setImageUrl}/>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
