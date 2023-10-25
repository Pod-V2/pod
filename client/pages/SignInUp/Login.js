import * as React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Import styled from the 'styled-components' library
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
  

export default function loginUser() {
  // Array for Landing Page Nav Links
  const navigate = useNavigate();
  const login = async(event) => {
  event.preventDefault();
  try {
    const data = new FormData(event.currentTarget);
    const user = {
      "email": data.get('email'),
      "password": data.get('password')
    }

    fetch('/api/auth/login', {
      method: "POST",
      mode: 'cors',
      headers: {
      "Content-Type": "application/json",
        },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if(res.ok) {
        navigate('/home')
      }
    })
  } catch (err) {
    console.error("Error:", err)
  }
}


  return (
    <LandingPageContainer>
      <LandingPageNavbar>
          <Link key='login' onClick={() => navigate('/signup')}>
            Sign up
          </Link>
      </LandingPageNavbar>
      <LandingPageBody>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
          backdropFilter: 'blur 3px',
          backdropFilter: 'brightness(40%)',
          backdropFilter: 'contrast(40%)',
          borderRadius: '10px',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '15px 15px 15px 15px'
        }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color='black'>
        Log in
        </Typography>
          <Box component="form" noValidate onSubmit={login} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            style={{
              background: 'white',
              backdropFilter: 'blur 3px',
              backdropFilter: 'brightness(40%)',
              backdropFilter: 'contrast(40%)',
              borderRadius: '5px',
              padding: '-2px'
            }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
            style={{
              background: 'white',
              backdropFilter: 'blur 3px',
              backdropFilter: 'brightness(40%)',
              backdropFilter: 'contrast(40%)',
              borderRadius: '5px',
              padding: '-2px'
            }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          </Grid>
          </Grid>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Log in
          </Button>
          <Grid container justifyContent="flex-end">
          <Grid item>
          <Link href="/signup" variant="body2">
          First time here? Sign up
          </Link>
          </Grid>
          </Grid>
          </Box>
        </Box>
      </Container>
      </LandingPageBody>
    </LandingPageContainer>
  );
}

const LandingPageContainer = styled.div`
  background: 
    url("https://www.searchenginejournal.com/wp-content/uploads/2023/04/marketplace-ecommerce-sellers-6436a446a2a18-sej-1280x720.png") no-repeat center center fixed;
  background-color: rgba(0, 0, 0, 0.3); /* Black overlay */
  background-blend-mode: overlay;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: white;
`;

const LandingPageNavbar = styled.div`
  display: flex;
  justify-content: flex-end; /* Align to the right */
  margin: 3rem;
  a {
    color: white;
    margin-right: 5rem; 
    font-size: 1.25rem;
    text-decoration: none;
  }
`;

const LandingPageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%; /* Adjust the height to create more space */
  h1 {
    text-align: center;
    font-size: 5rem;
    padding: 1rem;
  }
  h3 {
    text-align: center;
    font-size: 1.25rem;
  }
`;