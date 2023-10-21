import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { TextField, Button, FormControl } from '@material-ui/core';

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [fullname, setfullname] = useState('')
  const [password, setPassword] = useState('')
  // const [username, setUsername] = useState('')
  // const [lastName, setlastName] = useState('')
  // const [city, setCity] = useState('')
  // const [zip, setZip] = useState('')
  // const [state, setState] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [address, setaddress] = useState('')
  

  const handleSubmit = async(e) =>{
    e.preventDefault()
  }
  // console.log('test')
  return (
  <div>
    <StyledH3 >New here? Sign Up!</StyledH3>
    <StyledContainer id='Signup Container'>
      <FormControl onSubmit={handleSubmit}>
        <TextField label="Full Name" variant="filled" type="text"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        />
        <TextField label="Email" variant="filled" type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <TextField label="Password" variant="filled" type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button className="signup">Signup</Button>
      </FormControl>
    </StyledContainer>

  </div>
  );
}

const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  min-height: 500px
`

const StyledH3 = styled.h3`
  display: grid;
  justify-content: center;
  text-align: center
`
 
export default SignUp;