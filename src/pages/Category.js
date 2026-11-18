
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { womenProducts } from "../data/products";
import { useShop } from "../Context/ShopContext";

// COLLECTION INFORMATION

const collectionDetails = {
  clothing: {
    title: "Clothing",
    description:
      "From everyday essentials to statement-making outfits, find your perfect style.",
  },
  bags: {
    title: "Bags",
    description:
      "Carry your confidence with timeless bags for every occasion.",
  },
  accessories: {
    title: "Accessories",
    description:
      "It's the little details that make your style unforgettable.",
  },
  footwear: {
    title: "Footwear",
    description:
      "Step into comfort, elegance, and effortless style.",
  },
  beauty: {
    title: "Beauty",
    description:
      "Discover beauty essentials that celebrate your natural glow.",
  },
  jewelry: {
    title: "Jewelry",
    description:
      "Beautiful little details to make every moment shine.",
  },
  women: {
    title: "Women",
    description:
      "Discover the complete ALLINO women's collection.",
  },
};

// FORMAT CATEGORY NAMES

const formatName = (name) => {
  return name
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export default function Category() {
  const { categoryName } = useParams();

  const { addToCart, wishlist, toggleWishlist } =
    useShop();

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("featured");

  const slug = categoryName.toLowerCase();

  // RESET FILTERS WHEN CATEGORY CHANGES

  useEffect(() => {
    setActiveFilter("all");
    setSortBy("featured");
    window.scrollTo(0, 0);
  }, [slug]);

  // ONLY WOMEN'S PRODUCTS

  const collectionProducts = womenProducts.filter(
    (product) =>
      slug === "women" ||
      product.collection === slug ||
      product.type === slug
  );

  // COLLECTION TITLE

  const details = collectionDetails[slug] || {
    title: formatName(slug),
    description:
      "Discover beautiful styles that feel uniquely you.",
  };

  // GENERATE SUBCATEGORY FILTERS AUTOMATICALLY

  const filters = [
    "all",
    ...new Set(
      collectionProducts.map((product) => product.type)
    ),
  ];

  // FILTER PRODUCTS

  const filteredProducts =
    activeFilter === "all"
      ? collectionProducts
      : collectionProducts.filter(
          (product) => product.type === activeFilter
        );

  // SORT PRODUCTS

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      if (sortBy === "newest") {
        return b.id - a.id;
      }

      return 0;
    }
  );

  return (
    <motion.main
      className="allino-collection-page"
      key={slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >

      

      {/* SUBCATEGORY FILTERS */}

      {filters.length > 1 && (
        <div className="allino-collection-filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`allino-filter-button ${
                activeFilter === filter
                  ? "active"
                  : ""
              }`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter === "all"
                ? "All Products"
                : formatName(filter)}
            </button>
          ))}
        </div>
      )}

      {/* COLLECTION CONTENT */}

      <section className="allino-collection-content">

        {/* PRODUCT COUNT AND SORTING */}

        <div className="allino-collection-toolbar">

          <div>
            <h2>Explore {details.title}</h2>

            <p className="allino-product-count">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1
                ? "Product"
                : "Products"}
            </p>
          </div>

          <select
            className="allino-sort-select"
            value={sortBy}
            aria-label="Sort products"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">
              Featured
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>
          </select>

        </div>

        {/* PRODUCT GRID */}

        {sortedProducts.length > 0 ? (
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="allino-collection-empty">

            <h2>No Products Found</h2>

            <p>
              We are curating something beautiful for you.
            </p>

            <Link to="/">
              Continue Shopping →
            </Link>

          </div>
        )}

      </section>

    </motion.main>
  );
}
