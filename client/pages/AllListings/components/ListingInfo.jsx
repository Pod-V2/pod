import React, { useEffect, useState } from "react";


const ListingInfo = (props) => {

    // const [image, setImage] = useState(null);

    const listingData = props.item;

return (
    <div>
        {<img src={props.item.img_url}/>}
        {/* <div>{listingData}</div> */}
        <div>{listingData.listing}</div>
        <div>${listingData.price}</div>
        <div>{listingData.quantity}</div>
        <div>{listingData.category}</div>
        <div>{listingData.seller}</div>
    </div>
)
}

export default ListingInfo;