
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";

import { useShop } from "../Context/ShopContext";

function ProductCard({
  product,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { cart } = useShop();

  // Check whether this product is already in the cart
  const isInCart = cart.some(
    (item) => item.id === product.id
  );

  // Check wishlist status
  const isWishlisted = (wishlist || []).some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
    >
      <div className="product-image">

        {/* PRODUCT IMAGE */}

        <Link
          to={`/product/${product.id}`}
          className="product-image-link"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {/* PRODUCT TAG */}

        {product.tag && (
          <span className="product-tag">
            {product.tag}
          </span>
        )}

        {/* WISHLIST BUTTON */}

        <button
          type="button"
          className={`wishlist-btn ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FiHeart
            fill={
              isWishlisted ? "currentColor" : "none"
            }
          />
        </button>

        {/* ADD TO BAG / ADDED TO CART */}

        <button
          type="button"
          className={`quick-add ${
            isInCart ? "added-to-cart" : ""
          }`}
          onClick={handleAddToCart}
          aria-label={
            isInCart
              ? "Already added to cart"
              : "Add to bag"
          }
        >
          {isInCart ? (
            <>
              <FiCheck />
              ADDED TO CART
            </>
          ) : (
            <>
              <FiShoppingBag />
              ADD TO BAG
            </>
          )}
        </button>

      </div>

      {/* PRODUCT INFORMATION */}

      <div className="product-info">
        <p>{product.category}</p>

        <Link
          to={`/product/${product.id}`}
          className="product-name-link"
        >
          <h3>{product.name}</h3>
        </Link>

        <div className="product-price">
          <strong>₹{product.price}</strong>
          <del>₹{product.oldPrice}</del>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
