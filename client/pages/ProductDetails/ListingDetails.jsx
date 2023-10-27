import React, { useEffect, useState } from 'react';
import { CardContent, FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import PrimarySearchAppBar from '../../common/Header.jsx';
import { useQuery } from '@tanstack/react-query';
import { CardMedia } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { ListingText } from './components/ListingText.jsx'

/**
 * Product creation details page
 * @param {*} props no props needed
 * @returns
 */
export const ListingDetails = (props) => {
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
          <h1>Listing Details</h1>
        </Box>
        <Card sx={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={data.img_url}
                alt="green iguana"
                sx={{ maxHeight: 600 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ListingText data={data}></ListingText>
                <Button size="large" color="primary">
                  Add to Cart
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default ListingDetails;
