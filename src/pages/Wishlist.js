import React from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { useShop } from "../Context/ShopContext";

function Wishlist() {
 const {
    wishlist,
    removeFromWishlist,
    addToCart,
  } = useShop(); 
  
  return (
    <div className="shopping-page">
      <h1>My Wishlist ♡</h1>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <FiHeart size={55} />
          <h2>Your wishlist is empty!</h2>
          <p>Save your favourite products here.</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <strong>₹{item.price}</strong>
                <button onClick={() => addToCart(item)}>
                  Add to Bag
                </button>
                <button onClick={() => removeFromWishlist(item.id)}>
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;