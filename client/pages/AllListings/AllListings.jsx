import React, { useEffect, useState } from "react";
import ListingInfo from "./components/ListingInfo.jsx";

export const AllListings = () => {

    const [items, setItems] = useState([]);

    const getAllItems = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/listing/');
            const data = await res.json();
            setItems(data);
            return 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // const getItemsByCategory = async (categoryId) => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/listing/${listingId}`);
    //         const data = await res.json();
    //         setItems(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    const populateItems = async () => {
        // if (categoryId) {
        //     getItemsByCategory(categoryId);
        // }
        // else {
            await getAllItems();
        // }
    }

    useEffect(() => {
        getAllItems();
    }, [])

    return (
        <div>
            {items.map(item => <ListingInfo key={item.id} item={item}/>)}
        </div>
    );
}


export default AllListings;