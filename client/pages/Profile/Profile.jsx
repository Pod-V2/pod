import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../common/Header.jsx';
import { Typography } from '@mui/material';
import styled from 'styled-components';


export default function Profile() {
    const [ userInfo, setUserInfo ] = useState()
    const [ loading, setLoading ] = useState();

    useEffect(() => {
        fetch('/api/profile/')
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setUserInfo(data);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const flag = userInfo?.name;

    
    return (
        <div>
            <Header/>
            {!flag ? <h1>Loading...</h1> : 
            <div>
                <Typography variant='h2' align='center' sx={{
                    minHeight: '100px'
                }}>
                    Welcome, {userInfo.name}
                </Typography>
                <hr/>
                <CardContainer>
                    <h2>Your current Listings</h2>
                </CardContainer>
                <hr/>
                <CardContainer>
                    <h2>Previous Orders</h2>
                </CardContainer>
            </div>
        }
        </div>
    )
}

const CardContainer = styled.div`
    min-height: 400px
`