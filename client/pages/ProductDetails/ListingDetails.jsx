import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PrimarySearchAppBar from '../../common/Header.jsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ListingText } from './components/ListingText.jsx';

export const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/listing/id/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  if (isPending) {
    return (
      <>
        <PrimarySearchAppBar />
        <Box m={2} display="flex" justifyContent="center">
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PrimarySearchAppBar />
        <Box m={2} display="flex" justifyContent="center">
          <Typography variant="h4">
            An error has occurred in fetching listings: {error.message}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Box m={2} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Listing Details
        </Typography>
        <Card>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={data.img_url}
                alt="Listing Image"
                style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <ListingText data={data} />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/cart')}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default ListingDetails;
