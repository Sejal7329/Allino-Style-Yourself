
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

function ProductCard({
  product,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
    >
      <div className="product-image">

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

        {product.tag && (
          <span className="product-tag">
            {product.tag}
          </span>
        )}

        <button
          type="button"
          className={`wishlist-btn ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
        >
          <FiHeart
            fill={
              isWishlisted ? "currentColor" : "none"
            }
          />
        </button>

        <button
          type="button"
          className="quick-add"
          onClick={() => addToCart(product)}
        >
          <FiShoppingBag />
          ADD TO BAG
        </button>
      </div>

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
