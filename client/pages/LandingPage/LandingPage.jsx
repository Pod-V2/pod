import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Import styled from the 'styled-components' library

export default function LandingPage() {
  // Array for Landing Page Nav Links
  const LandingPageNav = ['Login', 'Signup'];

  return (
    <LandingPageContainer>
      <LandingPageNavbar>
        {LandingPageNav.map((page, index) => (
          <Link key={index} to={`/${page.toLowerCase()}`}>
            {page.toUpperCase()}
          </Link>
        ))}
      </LandingPageNavbar>
      <LandingPageBody>
        <h1>POD V2</h1>
        <h3>A marketplace for used goods</h3>
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