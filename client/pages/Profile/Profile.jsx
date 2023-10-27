import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../../common/Header.jsx';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import ListingCard from './ListingCards.jsx';


export default function Profile() {
    const [ userInfo, setUserInfo ] = useState()
    const [ listingInfo, setListingInfo ] = useState();
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
                console.log(data)
                setUserInfo(data.userInfo);
                setListingInfo(data.listingInfo)
                // listingInfo.forEach((listing) => {
                //     listingArr.push(<ListingCard image={listing.image_url} title={listing.product_title} prodcut_title={listing.product_listing} price={listing.price}/>)
                // })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const userFlag = userInfo?.name;
    const listingFlag = listingArr?.length;

    const listingArr = [];

    
    
    return (
        <div>
            <Header/>
            {!userFlag ? <h1>Loading...</h1> : 
            <div>
                <Typography variant='h2' align='center' sx={{
                    minHeight: '100px'
                }}>
                    Welcome, {userInfo.name}
                </Typography>
                <hr/>
                <CardContainer>
                    <StyledHeader>Your current Listings</StyledHeader>
                    <ListingCard/>
                </CardContainer>
                <hr/>
                <CardContainer>
                    <StyledHeader>Previous Orders</StyledHeader>
                    <ListingCard/>
                </CardContainer>
            </div>
        }
        </div>
    )
}

const CardContainer = styled.div`
    min-height: 400px
`

const StyledHeader = styled.h2`
    margin: 5px
`