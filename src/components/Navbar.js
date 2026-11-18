
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useShop } from "../Context/ShopContext";
import products from "../data/products";

import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Navbar() {
  const {
    cartCount,
    wishlist,
    addToCart,
    toggleWishlist,
  } = useShop();

  const wishlistCount = wishlist.length;

  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const lastScrollY = useRef(0);
  const searchInputRef = useRef(null);

  // SEARCH FILTER
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.tag || "").toLowerCase().includes(query)
    );
  });

  const popularSearches = [
    "Dress",
    "Bag",
    "Sunglasses",
    "Women",
    "Accessories",
  ];

  // HIDE NAVBAR ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (menuOpen || searchOpen || currentScrollY < 80) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen, searchOpen]);

  // AUTOMATICALLY FOCUS SEARCH INPUT
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // CLOSE WITH ESCAPE KEY
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // CLOSE ALL PANELS
  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setShowNavbar(true);
  };

  // TOGGLE MOBILE MENU
  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
    setSearchOpen(false);
    setSearchQuery("");
    setShowNavbar(true);
  };

  // TOGGLE SEARCH
  const toggleSearch = () => {
    setSearchOpen((previous) => !previous);
    setMenuOpen(false);
    setSearchQuery("");
    setShowNavbar(true);
  };

  return (
    <motion.header
      className="navbar"
      initial={{ y: "-100%" }}
      animate={{
        y:
          showNavbar || menuOpen || searchOpen
            ? "0%"
            : "-100%",
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
    >
      {/* FREE SHIPPING BANNER */}

      <div className="nav-top">
        FREE SHIPPING ON ORDERS ABOVE ₹1999
      </div>

      {/* MAIN NAVBAR */}

      <nav className="nav-container">
        <button
          type="button"
          className="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="allino-mobile-navigation"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
          onClick={closePanels}
        >
          ALLINO<span>.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="nav-links">
          <Link to="/" onClick={closePanels}>
            Home
          </Link>

          <a href="/#shop" onClick={closePanels}>
            Shop
          </a>

          <a href="/#categories" onClick={closePanels}>
            Categories
          </a>

          <a href="/#about" onClick={closePanels}>
            About
          </a>
        </div>

        {/* NAVBAR ICONS */}

        <div className="nav-icons">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
          >
            {searchOpen ? <FiX /> : <FiSearch />}
          </button>

          <Link
            to="/wishlist"
            className="nav-action"
            aria-label="Wishlist"
            onClick={closePanels}
          >
            <FiHeart />
            <span>{wishlistCount}</span>
          </Link>

          <Link
            to="/cart"
            className="nav-action cart-icon"
            aria-label="Shopping bag"
            onClick={closePanels}
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </Link>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}

      {menuOpen && (
        <div
          id="allino-mobile-navigation"
          className="mobile-nav mobile-nav-open"
        >
          <Link to="/" onClick={closePanels}>
            Home
          </Link>

          <a href="/#shop" onClick={closePanels}>
            Shop
          </a>

          <a href="/#categories" onClick={closePanels}>
            Categories
          </a>

          <a href="/#about" onClick={closePanels}>
            About
          </a>
        </div>
      )}

      {/* SEARCH OVERLAY */}

      {searchOpen && (
        <>
          <div
            className="allino-search-overlay"
            onClick={closePanels}
          />

          <motion.div
            className="allino-search-panel"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="allino-search-container">

              {/* SEARCH HEADING */}

              <div className="allino-search-heading">
                <h2>Find Your Style.</h2>

                <button
                  type="button"
                  className="allino-search-close"
                  aria-label="Close search"
                  onClick={closePanels}
                >
                  <FiX />
                </button>
              </div>

              {/* SEARCH INPUT */}

              <div className="allino-search-box">
                <FiSearch />

                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search dresses, bags, accessories..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                />

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                  >
                    <FiX />
                  </button>
                )}
              </div>

              {/* POPULAR SEARCHES */}

              {!searchQuery.trim() && (
                <div className="allino-popular-searches">
                  <h4>POPULAR SEARCHES</h4>

                  <div className="allino-search-tags">
                    {popularSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSearchQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SEARCH RESULTS */}

              {searchQuery.trim() && (
                <div className="allino-search-results">

                  <p className="allino-search-count" aria-live="polite">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}{" "}
                    found for "{searchQuery.trim()}"
                  </p>

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const isWishlisted = wishlist.some(
                        (item) => item.id === product.id
                      );

                      return (
                        <div
                          className="allino-search-product"
                          key={product.id}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div className="allino-search-product-info">
                            <span>{product.category}</span>

                            <h3>{product.name}</h3>

                            <div className="allino-search-price">
                              <strong>
                                ₹{product.price.toLocaleString("en-IN")}
                              </strong>

                              {product.oldPrice && (
                                <del>
                                  ₹{product.oldPrice.toLocaleString("en-IN")}
                                </del>
                              )}
                            </div>
                          </div>

                          <div className="allino-search-actions">

                            <button
                              type="button"
                              aria-label={
                                isWishlisted
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"
                              }
                              aria-pressed={isWishlisted}
                              className={`allino-search-heart ${
                                isWishlisted ? "active" : ""
                              }`}
                              onClick={() =>
                                toggleWishlist(product)
                              }
                            >
                              <FiHeart
                                fill={
                                  isWishlisted
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>

                            <button
                              type="button"
                              className="allino-search-add"
                              onClick={() => addToCart(product)}
                            >
                              <FiShoppingBag />
                              <span>Add to Bag</span>
                            </button>

                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="allino-no-results">
                      <FiSearch />

                      <h3>No products found</h3>

                      <p>
                        Try searching for another product
                        or category.
                      </p>

                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  );
}

export default Navbar;
