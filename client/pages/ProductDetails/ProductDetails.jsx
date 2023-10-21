import React, { useEffect, useState } from "react";
import ListingInputsImage from "./components/ListingInputsImage.jsx";

/**
 * Product creation details page
 * @param {*} props
 * @returns
 */
export const ProductDetails = (props) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomNumber = getRandomInt(10000);

  /**
   * Submit inputs state variable to /api/listing to create a new listing
   * @param {*} event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Create object from FormData obj and change types if needed
    const inputs = Object.fromEntries(formData.entries());
    inputs.price = parseFloat(inputs.price);
    inputs.returned = false;

    // Stringify to send in POST request body
    console.log("asdads", inputs);

    // fetch("http://localhost:3000/api/listing/", {
    //   method: "POST",
    //   body: JSON.stringify(inputs),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     console.log("Response from backend:", inputs);
    //   })
    //   .catch((error) => {
    //     console.log(inputs);
    //     console.error("Error:", error);
    //   });
  };

  /**
   * @param {string} req.body.userid
   * @param {string} req.body.product_title
   * @param {string} req.body.price
   * @param {string} req.body.description
   * @param {string} req.body.category
   * @param {string} req.body.img_url
   */
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:{" "}
          <input
            className="input"
            type="text"
            name="product_title"
          />
        </label>
        <label>
          Price:{" "}
          <input
            className="input"
            type="number"
            name="price"
          />
        </label>
        <label>
          Category:{" "}
          <input
            className="input"
            type="text"
            name="category"
          />
        </label>
        <label>
          Seller:{" "}
          <input
            className="input"
            type="text"
            name="userid"
          />
        </label>
        <label>
          Description:{" "}
          <input
            className="input"
            type="text"
            name="description"
          />
        </label>
        <div>
          <ListingInputsImage listingUrl={randomNumber} />
        </div>
        <input className="listingsInputs" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ProductDetails;
