
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";

import { getProductById } from "../data/products";
import { useShop } from "../Context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();

  const product = getProductById(id);

  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // RESET OPTIONS WHEN PRODUCT CHANGES

  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setMessage("");
    window.scrollTo(0, 0);
  }, [id]);

  // PRODUCT NOT FOUND

  if (!product) {
    return (
      <main className="allino-product-not-found">
        <h2>Product Not Found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <Link to="/">Continue Shopping →</Link>
      </main>
    );
  }

  // PRODUCT OPTIONS

  const clothingTypes = [
    "dresses",
    "tops",
    "co-ord-sets",
    "jeans",
    "shirts",
    "skirts",
    "t-shirts",
    "trousers",
    "hoodies",
    "jackets",
    "blazers",
  ];

  const isClothing =
    product.collection === "clothing" ||
    clothingTypes.includes(product.type);

  const isFootwear = product.collection === "footwear";

  const hideVariants = ["jewelry", "beauty"].includes(
  product.collection
);

  const sizes = isFootwear
    ? ["36", "37", "38", "39", "40", "41"]
    : isClothing
    ? ["XS", "S", "M", "L", "XL"]
    : [];

  // Demo color options.
  // Replace with actual product variants later.

  const colors = [
    { name: "Burgundy", hex: "#722f45" },
    { name: "Beige", hex: "#d8c3ad" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Red", hex: "#ff0000" },
    { name: "Blue", hex: "#0a0a55" },
    { name: "Green-cyan", hex: "#176a57" },
  ];

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

  // ADD TO CART

  
const handleAddToCart = () => {
  if (sizes.length > 0 && !selectedSize) {
    setMessage("Please select a size first.");
    return;
  }

  if (!hideVariants && !selectedColor) {
    setMessage("Please select a color first.");
    return;
  }

  addToCart(product, {
    size: hideVariants ? "" : selectedSize,
    color: hideVariants ? "" : selectedColor,
    quantity,
  });

  setMessage(
    `${quantity} ${
      quantity === 1 ? "item" : "items"
    } added to your bag!`
  );
};


  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <motion.main
      className="allino-product-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="allino-product-details-container">

        {/* BACK TO COLLECTION */}

        <Link
          to={`/category/${product.collection}`}
          className="allino-product-back"
        >
          <FiArrowLeft />
          Back to Collection
        </Link>

        <div className="allino-product-details-grid">

          {/* PRODUCT IMAGE */}

          <div className="allino-product-details-image">
            <img
              src={product.image}
              alt={product.name}
            />

            {product.tag && (
              <span className="allino-details-tag">
                {product.tag}
              </span>
            )}
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="allino-product-details-info">

            <p className="allino-details-category">
              {product.category} /{" "}
              {product.type.replace(/-/g, " ")}
            </p>

            <h1>{product.name}</h1>

            {/* PRICE */}

            <div className="allino-details-price">
              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              {product.oldPrice && (
                <del>
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </del>
              )}

              {discount > 0 && (
                <span>{discount}% OFF</span>
              )}
            </div>

            <p className="allino-details-description">
              Discover effortless style with this
              thoughtfully selected ALLINO piece.
              Designed to complement your everyday
              wardrobe and special moments.
            </p>

            <div className="allino-details-divider" />

            {/* SIZE SELECTION */}

            {sizes.length > 0 && (
              <div className="allino-details-option">

                <div className="allino-details-option-heading">
                  <h3>Select Size</h3>
                  <span>
                    {selectedSize || "Choose your size"}
                  </span>
                </div>

                <div className="allino-size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`allino-size-btn ${
                        selectedSize === size
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(size);
                        setMessage("");
                      }}
                      aria-pressed={
                        selectedSize === size
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>

              </div>
            )}

            {/* COLOR SELECTION */}

           {!hideVariants && (
  <div className="allino-details-option">
    <div className="allino-details-option-heading">
      <h3>Color</h3>
      <span>{selectedColor || "Choose a color"}</span>
    </div>

    <div className="allino-color-options">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          className={`allino-color-btn ${
            selectedColor === color.name ? "active" : ""
          }`}
          style={{ backgroundColor: color.hex }}
          onClick={() => setSelectedColor(color.name)}
          title={color.name}
          aria-label={color.name}
          aria-pressed={selectedColor === color.name}
        />
      ))}
    </div>
  </div>
)}

            {/* QUANTITY */}

            <div className="allino-details-option">
              <h3>Quantity</h3>

              <div className="allino-quantity-selector">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>

              </div>
            </div>

            {/* ADD TO BAG */}

            <button
              type="button"
              className="allino-details-add-btn"
              onClick={handleAddToCart}
            >
              <FiShoppingBag />
              ADD TO BAG
            </button>

            {/* WISHLIST */}

            <button
              type="button"
              className={`allino-details-wishlist-btn ${
                isWishlisted ? "active" : ""
              }`}
              onClick={handleWishlist}
            >
              <FiHeart
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />

              {isWishlisted
                ? "REMOVE FROM WISHLIST"
                : "ADD TO WISHLIST"}
            </button>

            {/* FEEDBACK MESSAGE */}

            {message && (
              <p
                className="allino-details-message"
                role="status"
              >
                {message}
              </p>
            )}

            {/* SHOPPING INFORMATION */}

            <div className="allino-details-benefits">

              <div>
                <FiTruck />
                <span>
                  Free shipping on orders above ₹1999
                </span>
              </div>

              <div>
                <FiShield />
                <span>
                  Secure shopping experience
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.main>
  );
}
