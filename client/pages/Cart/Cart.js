import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiCart } from "react-icons/bi"; 
// import { useSelector } from "react-redux";
import Item from "../Sell/components/Item";
import ItemCard from "./components/ItemCard";

// const Item = ({item}) => {
//     const handleRemoveBtnClick = () => {

//     }
//     return (
//         <Container>
//             <div>
//                 <p className="text"> <strong>Item:</strong>{item}
//                 </p>
//                 <p>Price: $10</p>
//             </div>
            
//             <div className="removeItemDiv">
//                 <button onClick={handleRemoveBtnClick}>Remove</button>
//             </div>
//         </Container>
//     );
// };


const Cart = () => {
    const [output, setOutput] = useState([]);
    console.log('loading with output: ', output);
    const handleRemoveBtnClick = async (id) => {
        // console.log(`Invoking handleRemoveBtnClick with listingId: ${id}`);
        // alert(`Invoking handleRemoveBtnClick with listingId: ${id}`);
        try {
            // Retrieve all current listingids
            fetch('/api/cart/?id=14')
            .then(data => data.json())
            .then(async (data) => {
                const currentListingIds = data.listingid;
                const updatedOutput = output.filter(item => item !== output[id]);
                console.log('currentListingIds: ', currentListingIds);
                const updatedLisingIds = currentListingIds.filter(currentId => currentId !== currentListingIds[id]);
                console.log('updatedOutput: ', updatedOutput);
                console.log('updatedLisingIds: ', updatedLisingIds);
                fetch(`/api/listing/?userId=14`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedLisingIds)
                })
                .then(data => data)
                .then(data => {
                    fetch(`/api/cart/?id=14`)
                    .then(data => data.json())
                    .then(async (data) => {
                        const listingIds = data.listingid;
                        listingIds.sort((a, b) => a - b);
                        const jsonIds = JSON.stringify(listingIds);
                        const rawItems = await fetch(`/api/listing/14?data=${jsonIds}`);
                        console.log('rawItems: ', rawItems);
                        const jsonData = await rawItems.json();
                        console.log('jsonData: ', jsonData);
                        setOutput(jsonData);
                    })
                    .catch(err => {
                        console.log('Something went wrong from getting /api/cart: ', err.message);
                    });
                })
                .catch(err => {
                    console.log('err on PATCH listingIds: ', err.message);
                });
            })
            .catch(err => {
                console.log('err: ', err);
            });
        }
        catch(err) {
            console.log('Something wrong from handleRemoveBtnClick!');
        }
    }

    useEffect(() => {
        fetch('/api/cart/?id=14')
        .then(data => data.json())
        .then(async (data) => {
            console.log('All listing ids in user cart: ', data);
            const listingIds = data.listingid;
            listingIds.sort((a, b) => a - b);
            const jsonIds = JSON.stringify(listingIds);
            const rawItems = await fetch(`/api/listing/14?data=${jsonIds}`);
            console.log('rawItems: ', rawItems);
            const jsonData = await rawItems.json();
            console.log('jsonData: ', jsonData);
            setOutput(jsonData);
        })
        .catch(err => {
            console.log('Something went wrong from getting /api/cart', err.message);
        });
    }, []);
    
    const display = (output) => {
        console.log('.. .. .. output: ', output);
        // if(Array.isArray(output)) {
            return (
                <div>
                    {/* {output.map((item, i)=> (
                        <Display>
                     <Item key={i} item={item} />
                        </Display>
                    ))} */}
                    {output.map((item, i) => <Item key={i} item={item} />)}
                </div>
            )
        // }

        // return output;
    }

    const getTotal = () => {
        let sum = 0;
        for (const item of output) {
            sum += parseFloat(item.price);
        }
        return sum;
    }

    return(

        <CartContainer>
            
            <div>
            <h2>My Cart <a>{<BiCart/>}</a></h2>
           
            <hr></hr>
            {/* {display(output)} */}
            {/* {output.length ? output.map((item, i) => {
                console.log('item: ', item);
                return <Item key={i} item={item} handleRemoveBtnClickParent = {handleRemoveBtnClick} id={i}/>
            }) : 'No items to show'} */}
            {output.length ? output.map((item, i) =>
                <ItemCard key={i} name={item.listing}
                price={item.price}
                img_url={item.img_url}
                description={item.description} handleRemoveBtnClickParent = {handleRemoveBtnClick} id={i}/>) : 'No items to show'}
            </div>

            <Checkout>
                <h2>Checkout</h2>

                <strong>Shipping cost: </strong>
                <p></p>
                <strong>Discount: </strong>
                <p></p>
                <hr></hr>
                <span><strong>Total: ${getTotal()}</strong></span>  
                <p></p>
                
                <button>checkout</button>
            </Checkout>
        
        </CartContainer>
    )
}


const Display = styled.div`
gap: 1rem;
margin-top: 0.5rem;
`
const Container = styled.div`
color: white;
width : 90%;
height : 7rem;
display : grid;
margin: auto;
background-color : grey;
grid-template-columns :  2fr 1fr;

.Buttons {
    display: flex;
    flex-direction: column;
    
    button {
        height: 50%;
    }
}
`;
const CartContainer = styled.div`
margin-top: 1.5rem;
display: grid;
grid-template-columns : 2fr 1fr;
text-align: center;
width: 100%;

 
`

const Checkout = styled.div`
margin-top: 2.5rem;
background-color : white;
display: flex;
flex-direction: column;
align-items: center;

button {
    color: white;
   font-size: 1rem;
   text-align: center;
    width : 80%;
    height: 2rem;
    background-color: #2E97A7;
}

`
export default Cart;