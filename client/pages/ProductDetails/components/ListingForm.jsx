import React, { useCallback, useEffect, useState } from "react";
import ListingInputsImage from "./ListingInputsImage.jsx";
import { FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { debounce_leading } from "../debounce.js";

/**
 * Product creation details page
 * @param {string} imageUrl URL of uploaded image
 * @param {function} setImageUrl setter for imageUrl
 * @returns
 */
export const ListingForm = ({ imageUrl, setImageUrl }) => {
  const [submitStatus, setSubmitStatus] = useState("pending");

  /**
   * Submit inputs state variable to /api/listing to create a new listing
   * @param {*} event.target Form data to be submitted
   * @param {number} event.target.userid user ID, should be provided in cookie
   * @param {string} event.target.product_title Short name for product
   * @param {number} event.target.price Price
   * @param {string} event.target.description Long description of product
   * @param {string} event.target.category Product category
   * @param {string} event.target.img_url Image URL given after image upload
   */
  const handleSubmit = useCallback(
    debounce_leading((e) => {
      e.preventDefault();
      // Do not submit again if we already succeeded
      if (submitStatus === "success") {
        console.log("You have already created a new listing.");
        return;
      }
      const formData = new FormData(e.target);

      // Create inputs object from FormData obj and change types if needed
      const inputs = Object.fromEntries(formData.entries());
      console.log(inputs);
      inputs.price = parseFloat(inputs.price);

      // Make sure there is an image
      if (!imageUrl) {
        alert("Please upload a product image in jpg or png format.");
        return;
      }
      inputs["img_url"] = imageUrl;

      // Send POST request to server to add new listing
      // Stringify to send in POST request body
      fetch("http://localhost:3000/api/listing/", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSubmitStatus("success");
        })
        .catch((error) => {
          console.log(inputs);
          console.error("Error:", error);
          setSubmitStatus("error");
        });
    }),
  );

  const debouncedSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  /**
   * Request schema
   * @param {string} req.body.userid
   * @param {string} req.body.product_title
   * @param {string} req.body.price
   * @param {string} req.body.description
   * @param {string} req.body.category
   * @param {string} req.body.img_url
   */
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      onSubmit={debouncedSubmit}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        {submitStatus === "error" && (
          <Alert severity="error">
            There was an error creating your listing. Please try again.
          </Alert>
        )}
        {submitStatus === "success" && (
          <Alert severity="success">New listing successfully created!</Alert>
        )}
      </Stack>
      <FormControl>
        <TextField
          fullWidth
          required
          label="Product Name"
          className="input"
          type="text"
          name="product_title"
        />
        <TextField fullWidth required label="Price" className="input" type="number" name="price" />
        <TextField
          fullWidth
          required
          label="Category"
          className="input"
          type="text"
          name="category"
        />
        <TextField fullWidth label="Seller ID" className="input" type="text" name="userid" />
        <TextField
          fullWidth
          required
          label="Description"
          multiline
          minRows={6}
          maxRows={20}
          type="text"
          name="description"
        />
        <ListingInputsImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
        {/* <input className="listingsInputs" type="submit" value="Submit" /> */}
      </FormControl>
    </Box>
  );
};

export default ListingForm;
