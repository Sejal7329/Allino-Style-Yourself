
import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { trendingProducts } from "../data/products";
import { useShop } from "../Context/ShopContext";
import CategorySlider from "../components/CategorySlider";

export default function Home() {
  const { addToCart, wishlist, toggleWishlist } = useShop();

  return (
    <main>

      {/* HERO SECTION */}

      <Hero />

      {/* WOMEN'S CATEGORY SLIDER */}

      <CategorySlider />

      {/* TRENDING PRODUCTS */}

      <section className="products-section" id="shop">
        <div className="allino-section-heading">
          <span>THE STYLE EDIT</span>

          <h2>Trending Now</h2>

          <p>Fresh finds you'll want to wear on repeat.</p>
        </div>

        <div className="product-grid">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}

      <section className="allino-promo">
        <div className="allino-promo-content">
          <span>YOUR STYLE, YOUR RULES</span>

          <h2>
            Everyday Looks.
            <br />
            Extraordinary You.
          </h2>

          <p>
            Refresh your wardrobe with pieces that feel
            just as amazing as they look.
          </p>

          <a
            href="#shop"
            className="allino-promo-button"
          >
            Shop the Collection →
          </a>
        </div>

        <div className="allino-promo-image">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200"
            alt="ALLINO fashion collection"
          />
        </div>
      </section>

      {/* NEWSLETTER */}

      <section className="allino-newsletter">
        <span>JOIN THE ALLINO CLUB</span>

        <h2>A Little Style in Your Inbox</h2>

        <p>
          Be the first to hear about new collections,
          fresh trends, and exclusive offers.
        </p>

        <form
          className="allino-newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for shopping with Us 🥰");
          }}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />

          <button type="submit">
            Subscribe →
          </button>
        </form>
      </section>

      {/* FOOTER */}

      <footer className="allino-footer" id="about">
        <div className="allino-footer-grid">

          <div>
            <h2 className="allino-footer-logo">
              ALLINO<span>.</span>
            </h2>

            <p>
              Style your everyday with fashion that
              celebrates you.
            </p>
          </div>

          <div>
            <h3>Explore</h3>

            <a href="#shop">Shop All</a>

            <a href="#categories">Categories</a>

            <a href="#shop">Trending Now</a>
          </div>

          <div>
            <h3>Customer Care</h3>

            <Link to="/cart">Shopping Bag</Link>

            <Link to="/wishlist">Wishlist</Link>
          </div>

          <div>
            <h3>About ALLINO</h3>

            <p>
              Fashion, confidence, and individuality
              in every little detail.
            </p>
          </div>

        </div>

        <div className="allino-footer-bottom">
          © {new Date().getFullYear()} ALLINO.
          All rights reserved.
        </div>
      </footer>

    </main>
  );
}
