import React from "react";

import styled from "styled-components";
const Footer = () => {
    return (
        <Foot id='footer'>
            <p>Copyright, POD execs 2023</p>
        </Foot>
    )
}

const Foot = styled.div`
display: flex;
justify-content: center;
min-height: 50px
`
export default Footer;