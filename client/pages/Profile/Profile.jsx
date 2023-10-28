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
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const userFlag = userInfo?.name;
    const listingFlag = listingArr?.length

    const listingArr = [];

    listingInfo?.forEach((listing) => {
        listingArr.push(<ListingCard key={listing.listingid} productTitle={listing.product_title} price={listing.price} description={listing.description} imgUrl={listing.img_url} />)
        console.log(listingArr)
    })

    
    
    return (
        <div>
            
            {!userFlag ? <h1>Loading...</h1> : 
            <div>
                <Header/>
                <Typography variant='h2' align='center' sx={{
                    minHeight: '100px'
                }}>
                    Welcome, {userInfo.name}
                </Typography>
                <hr/>
                <CardContainer>
                    <StyledHeader>Your current Listings</StyledHeader>
                    <SideScroll>
                        {listingArr}
                    </SideScroll>
                </CardContainer>
                <hr/>
                <CardContainer>
                    <StyledHeader>Previous Orders</StyledHeader>
                    {listingArr[0]}
                </CardContainer>
            </div>
        }
        </div>
    )
}

const CardContainer = styled.div`
    min-height: 400px;
`

const StyledHeader = styled.h2`
    margin: 5px
`

const SideScroll = styled.div`
display: flex;
overflow-y: scroll;
width: 100%;
margin-right: 15px;
`