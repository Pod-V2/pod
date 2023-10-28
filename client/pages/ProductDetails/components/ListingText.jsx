
import React, { useEffect, useState } from "react";
import { CardContent, FormControl, FormLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const ListingText = ({data}) => {

  return (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        {data.price.toLocaleString('en-US', {
          style: 'currency', currency: 'USD',
        })}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {data.listing}
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        {data.category}
      </Typography>
      <Typography variant="body2" color="text.secondary" component="div">
        Sold by {data.seller}
      </Typography>
      <Typography variant="body2" color="text.primary" component="div">
        {data.description}
      </Typography>
    </div>
  );
};

export default ListingText;
