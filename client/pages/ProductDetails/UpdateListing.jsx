import React, { useEffect, useState } from 'react';
import ListingInputsImage from './components/ListingInputsImage.jsx';
import { CardContent, FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { ListingForm } from './components/ListingForm.jsx';
import PrimarySearchAppBar from '../../common/Header.jsx';
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import { CardActions, CardMedia } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const UpdateListing = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    refetchOnWindowFocus: false,
    queryFn: () => fetch(`http://localhost:3000/api/listing/${id}`).then((res) => res.json(),).then((res) => {
      console.log(res);
      return res;
    })
  });

  if (isPending) {
    return (<>
      <PrimarySearchAppBar/>
      <div>'Loading...'</div>
    </>);
  }
  if (error) return 'An error has occurred in fetching listings: ' + error.message;

  return (<>
    <PrimarySearchAppBar/>
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
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          image={data.img_url}
          alt="green iguana"
          sx={{maxHeight: 600}}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
            </Typography></div>
          <CardActions>
            <Button size="small" color="primary">
              Delete
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  </>);
};

export default UpdateListing;
