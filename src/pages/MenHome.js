
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useShop } from "../Context/ShopContext";

const menCategories = [
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800",
  },
  {
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    name: "Grooming",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800",
  },
];

export default function MenHome() {
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const menProducts = products.filter(
    (product) => product.gender === "men"
  );

  const featuredProducts = menProducts.slice(0, 8);

  return (
    <main className="allino-men-home">

      {/* PREMIUM HERO */}

      <section className="allino-men-hero">
        <div className="allino-men-hero-content">
          <span className="allino-men-eyebrow">
            ALLINO MEN / THE NEW STANDARD
          </span>

          <h1>
            OWN YOUR
            <br />
            <em>STYLE.</em>
          </h1>

          <p>
            Redefining everyday menswear with timeless
            essentials, sharp details, and effortless
            confidence.
          </p>

          <a href="#shop" className="allino-men-primary-btn">
            EXPLORE COLLECTION
            <FiArrowRight />
          </a>

          <div className="allino-men-hero-bottom">
            <span>01 / NEW SEASON</span>
            <span>BUILT FOR CONFIDENCE</span>
          </div>
        </div>

        <div className="allino-men-hero-image">
          <img
            src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1400"
            alt="Premium men's fashion"
          />
          <div className="allino-men-image-overlay" />
        </div>
      </section>

      {/* EDITORIAL STRIP */}

      <div className="allino-men-marquee">
        <span>TIMELESS DESIGN</span>
        <span className="allino-men-marquee-dot">✦</span>
        <span>MODERN ATTITUDE</span>
        <span className="allino-men-marquee-dot">✦</span>
        <span>EVERYDAY LUXURY</span>
        <span className="allino-men-marquee-dot">✦</span>
        <span>ALLINO MEN</span>
      </div>

      {/* MEN'S CATEGORIES */}

      <section
        className="allino-men-section allino-men-categories"
        id="categories"
      >
        <div className="allino-men-section-heading">
          <div>
            <span>CURATED FOR YOU</span>
            <h2>THE COLLECTIONS</h2>
          </div>

          <p>
            Essentials designed to elevate every
            part of your wardrobe.
          </p>
        </div>

        <div className="allino-men-category-grid">
          {menCategories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="allino-men-category-card"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
              />

              <div className="allino-men-category-overlay">
                <h3>{category.name}</h3>
                <FiArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section
        className="allino-men-section allino-men-products"
        id="shop"
      >
        <div className="allino-men-section-heading">
          <div>
            <span>THE MEN'S EDIT</span>
            <h2>TRENDING NOW</h2>
          </div>

          <p>
            Discover the pieces defining modern
            men's fashion.
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
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
          <p className="allino-men-empty">
            Men's products are coming soon.
          </p>
        )}
      </section>

      {/* PROMOTIONAL SECTION */}

      <section className="allino-men-promo">
        <div className="allino-men-promo-image">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200"
            alt="ALLINO men's premium collection"
            loading="lazy"
          />
        </div>

        <div className="allino-men-promo-content">
          <span>THE ALLINO PHILOSOPHY</span>

          <h2>
            DRESS WITH
            <br />
            PURPOSE.
          </h2>

          <p>
            It's more than what you wear. It's how
            you carry yourself. Discover fashion
            that speaks without saying a word.
          </p>

          <a href="#shop">
            DISCOVER YOUR STYLE
            <FiArrowRight />
          </a>
        </div>
      </section>

      {/* NEWSLETTER */}

      <section className="allino-men-newsletter">
        <span>JOIN THE INNER CIRCLE</span>

        <h2>STAY AHEAD OF THE CURVE.</h2>

        <p>
          Exclusive drops, style inspiration, and
          updates from ALLINO MEN.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Welcome to the ALLINO club!");
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            required
          />

          <button type="submit">
            SUBSCRIBE
            <FiArrowRight />
          </button>
        </form>
      </section>

      {/* FOOTER */}

      <footer className="allino-men-footer" id="about">
        <div className="allino-men-footer-top">
          <div>
            <h2>ALLINO<span>.</span></h2>
            <p>
              Modern essentials.
              <br />
              Timeless confidence.
            </p>
          </div>

          <div className="allino-men-footer-links">
            <div>
              <h3>EXPLORE</h3>
              <a href="#shop">Shop Collection</a>
              <a href="#categories">Categories</a>
              <a href="#shop">Trending Now</a>
            </div>

            <div>
              <h3>CUSTOMER CARE</h3>
              <Link to="/cart">Shopping Bag</Link>
              <Link to="/wishlist">Wishlist</Link>
            </div>
          </div>
        </div>

        <div className="allino-men-footer-bottom">
          <span>
            © {new Date().getFullYear()} ALLINO.
            ALL RIGHTS RESERVED.
          </span>
          <span>THE NEW STANDARD IN STYLE.</span>
        </div>
      </footer>

    </main>
  );
}
