import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { TextField, Button, FormControl } from '@material-ui/core';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
  }

  return ( 
    <div>
      <StyledH3>Login Here!</StyledH3>
    
      <StyledContainer>
          <FormControl className='login' onSubmit={handleSubmit}>
            <TextField label="Email" variant="filled" type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <TextField label="Password" variant="filled" type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <Button>Login</Button>
          </FormControl>
      </StyledContainer>
    </div>
  );
}


const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  min-height: 500px;
`
const StyledH3 = styled.h3`
display: grid;
justify-content: center;
text-align: center
`

export default Login;