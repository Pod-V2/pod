import React from "react";
const Item = ({item, handleRemoveBtnClickParent, id}) => {
  const handleRemoveBtnClick = () => {
    handleRemoveBtnClickParent(id);
  }
  return (
    <div className="item">
      <div className="itemInfo">
        <img src="" alt="Image of an item for sale" />
        <div className="sell-details">
          {/* <h2>{item.name}</h2>
          <h2>{item.price}</h2>
          <h4>{item.sellerName}</h4>
          <h4>{item.sellerLocation}</h4> */}
          <h2>{item.listing}</h2>
          <p>{item.description}</p>
          <h2>{item.price}</h2>
          {/* <h4>{item.qty}</h4> */}
          <h4>1</h4>
        </div>
        <div className="sell-product-details">
          {/* <p>{item.details}</p> */}
        </div>
      </div>
      <div className="removeItem">
        <button onClick={handleRemoveBtnClick}>Remove</button>
      </div>
    </div>
  );
}
 
export default Item;