
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { motion } from "framer-motion";

import { useShop } from "../Context/ShopContext";
import { useGender } from "../Context/GenderContext";
import products from "../data/products";

import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiCheck,
} from "react-icons/fi";

function Navbar() {
  const {
    cart,
    cartCount,
    wishlist,
    addToCart,
    toggleWishlist,
  } = useShop();

  const { gender, switchGender, isMen } = useGender();

  const navigate = useNavigate();
  const location = useLocation();

  const wishlistCount = wishlist.length;

  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const lastScrollY = useRef(0);
  const searchInputRef = useRef(null);

  // PRODUCTS FOR CURRENT GENDER
  const collectionProducts = products.filter(
    (product) => product.gender === gender
  );

  // SEARCH PRODUCTS
  const query = searchQuery.toLowerCase().trim();

  const filteredProducts = query
    ? collectionProducts.filter((product) => {
        return (
          (product.name || "")
            .toLowerCase()
            .includes(query) ||
          (product.category || "")
            .toLowerCase()
            .includes(query) ||
          (product.tag || "")
            .toLowerCase()
            .includes(query)
        );
      })
    : [];

  const popularSearches = isMen
    ? [
        "Shirt",
        "Jacket",
        "Shoes",
        "Watch",
        "Accessories",
      ]
    : [
        "Dress",
        "Bag",
        "Sunglasses",
        "Women",
        "Accessories",
      ];

  // CLOSE NAVIGATION PANELS
  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
    setShowNavbar(true);
  };

  // HIDE NAVBAR WHILE SCROLLING DOWN
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(
        0,
        window.scrollY
      );

      if (
        menuOpen ||
        searchOpen ||
        currentScrollY < 80
      ) {
        setShowNavbar(true);
      } else if (
        currentScrollY > lastScrollY.current
      ) {
        setShowNavbar(false);
      } else if (
        currentScrollY < lastScrollY.current
      ) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [menuOpen, searchOpen]);

  // FOCUS SEARCH INPUT
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // CLOSE PANELS ON ESCAPE
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setSearchQuery("");
        setShowNavbar(true);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // SCROLL TO A SECTION ON HOMEPAGE
  const scrollToSection = (sectionId) => {
    closePanels();

    if (location.pathname === "/") {
      const section = document.getElementById(
        sectionId
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // React Router navigation preserves gender context.
    navigate("/", {
      state: {
        scrollTo: sectionId,
      },
    });
  };

  // SCROLL AFTER RETURNING FROM COLLECTION PAGE
  useEffect(() => {
    if (
      location.pathname !== "/" ||
      !location.state?.scrollTo
    ) {
      return;
    }

    const sectionId = location.state.scrollTo;

    let frameId;
    let attempts = 0;

    const findSection = () => {
      const section = document.getElementById(
        sectionId
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        navigate("/", {
          replace: true,
          state: null,
        });

        return;
      }

      // Allow the homepage time to render.
      if (attempts < 15) {
        attempts += 1;
        frameId = requestAnimationFrame(
          findSection
        );
      }
    };

    frameId = requestAnimationFrame(findSection);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [
    location.pathname,
    location.state,
    navigate,
  ]);

  // GO TO HOMEPAGE
  const goHome = () => {
    closePanels();

    navigate("/", {
      state: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SWITCH BETWEEN WOMEN AND MEN
  const handleGenderSwitch = (nextGender) => {
    switchGender(nextGender);

    closePanels();

    navigate("/", {
      state: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
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
      className={`navbar ${
        isMen ? "allino-men-navbar" : ""
      }`}
      initial={{ y: "-100%" }}
      animate={{
        y:
          showNavbar ||
          menuOpen ||
          searchOpen
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
        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="mobile-menu"
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
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
          onClick={goHome}
        >
          ALLINO<span>.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="nav-links">
          <button
            type="button"
            onClick={goHome}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("shop")
            }
          >
            Shop
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("categories")
            }
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("about")
            }
          >
            About
          </button>
        </div>

        {/* WOMEN / MEN SWITCH */}

        <div
          className="allino-gender-switch"
          role="group"
          aria-label="Shop by collection"
        >
          <button
            type="button"
            className={`allino-gender-option ${
              gender === "women"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleGenderSwitch("women")
            }
            aria-pressed={
              gender === "women"
            }
          >
            WOMEN
          </button>

          <span className="allino-gender-divider" />

          <button
            type="button"
            className={`allino-gender-option ${
              gender === "men"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleGenderSwitch("men")
            }
            aria-pressed={
              gender === "men"
            }
          >
            MEN
          </button>
        </div>

        {/* NAVBAR ICONS */}

        <div className="nav-icons">
          {/* SEARCH */}

          <button
            type="button"
            aria-label={
              searchOpen
                ? "Close search"
                : "Search"
            }
            aria-expanded={searchOpen}
            onClick={toggleSearch}
          >
            {searchOpen ? (
              <FiX />
            ) : (
              <FiSearch />
            )}
          </button>

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="nav-action"
            aria-label="Wishlist"
            onClick={closePanels}
          >
            <FiHeart />
            <span>{wishlistCount}</span>
          </Link>

          {/* CART */}

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

      {/* MOBILE NAVIGATION */}

      {menuOpen && (
        <div
          id="allino-mobile-navigation"
          className="mobile-nav mobile-nav-open"
        >
          {/* MOBILE GENDER SWITCH */}

          <div
            className="allino-mobile-gender-switch"
            role="group"
            aria-label="Shop by collection"
          >
            <button
              type="button"
              className={
                gender === "women"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleGenderSwitch("women")
              }
              aria-pressed={
                gender === "women"
              }
            >
              WOMEN
            </button>

            <button
              type="button"
              className={
                gender === "men"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleGenderSwitch("men")
              }
              aria-pressed={
                gender === "men"
              }
            >
              MEN
            </button>
          </div>

          {/* MOBILE LINKS */}

          <button
            type="button"
            onClick={goHome}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("shop")
            }
          >
            Shop
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("categories")
            }
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("about")
            }
          >
            About
          </button>
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
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
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
                  placeholder={
                    isMen
                      ? "Search shirts, jackets, watches..."
                      : "Search dresses, bags, accessories..."
                  }
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
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
                    {popularSearches.map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setSearchQuery(item)
                          }
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* SEARCH RESULTS */}

              {searchQuery.trim() && (
                <div className="allino-search-results">
                  <p
                    className="allino-search-count"
                    aria-live="polite"
                  >
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}{" "}
                    found for "
                    {searchQuery.trim()}"
                  </p>

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(
                      (product) => {
                        const isWishlisted =
                          wishlist.some(
                            (item) =>
                              item.id ===
                              product.id
                          );

                        const isInCart =
                          cart.some(
                            (item) =>
                              item.id ===
                              product.id
                          );

                        return (
                          <div
                            className="allino-search-product"
                            key={product.id}
                          >
                            {/* PRODUCT IMAGE */}

                            <Link
                              to={`/product/${product.id}`}
                              onClick={closePanels}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                              />
                            </Link>

                            {/* PRODUCT DETAILS */}

                            <div className="allino-search-product-info">
                              <span>
                                {product.category}
                              </span>

                              <Link
                                to={`/product/${product.id}`}
                                onClick={closePanels}
                              >
                                <h3>
                                  {product.name}
                                </h3>
                              </Link>

                              <div className="allino-search-price">
                                <strong>
                                  ₹
                                  {product.price.toLocaleString(
                                    "en-IN"
                                  )}
                                </strong>

                                {product.oldPrice && (
                                  <del>
                                    ₹
                                    {product.oldPrice.toLocaleString(
                                      "en-IN"
                                    )}
                                  </del>
                                )}
                              </div>
                            </div>

                            {/* PRODUCT ACTIONS */}

                            <div className="allino-search-actions">
                              {/* WISHLIST BUTTON */}

                              <button
                                type="button"
                                aria-label={
                                  isWishlisted
                                    ? "Remove from wishlist"
                                    : "Add to wishlist"
                                }
                                aria-pressed={
                                  isWishlisted
                                }
                                className={`allino-search-heart ${
                                  isWishlisted
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleWishlist(
                                    product
                                  )
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

                              {/* ADD TO CART BUTTON */}

                              <button
                                type="button"
                                className={`allino-search-add ${
                                  isInCart
                                    ? "is-added"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (!isInCart) {
                                    addToCart(
                                      product
                                    );
                                  }
                                }}
                                aria-label={
                                  isInCart
                                    ? "Already added to cart"
                                    : "Add to bag"
                                }
                              >
                                {isInCart ? (
                                  <>
                                    <FiCheck />
                                    <span>
                                      Added to Cart
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FiShoppingBag />
                                    <span>
                                      Add to Bag
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div className="allino-no-results">
                      <FiSearch />

                      <h3>
                        No products found
                      </h3>

                      <p>
                        Try searching for
                        another product or
                        category.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setSearchQuery("")
                        }
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
