
import React, { useRef } from "react";

const categories = [
  {
  name: "Clothing",
  image:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900",
},
{
  name: "Footwear",
  image:
    "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=900&fit=crop",
},
{
  name: "Jewelry",
  image:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900",
},
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900",
  },
  
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900",
  },
 
];

export default function CategorySlider() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.querySelector(
      ".allino-category-card"
    );

    const gap = parseFloat(
      window.getComputedStyle(sliderRef.current).gap
    ) || 24;

    const distance = card
      ? card.getBoundingClientRect().width + gap
      : 320;

    sliderRef.current.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="allino-categories" id="categories">
      <div className="allino-section-heading">
        <span>EXPLORE ALLINO</span>
        <h2>Find Something for You</h2>
        <p>
          From everyday essentials to statement pieces,
          discover what makes your style unique.
        </p>
      </div>

      <div className="allino-category-slider-wrapper">
        <button
          type="button"
          className="allino-slider-arrow allino-slider-prev"
          onClick={() => scrollSlider(-1)}
          aria-label="Scroll left"
        >
          &#10094;
        </button>

        <div className="allino-category-slider" ref={sliderRef}>
          {categories.map((category) => (
            <a
              href={`/category/${category.name.toLowerCase()}`}
              className="allino-category-card"
              key={category.name}
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <div className="allino-category-overlay">
                <h3>{category.name}</h3>
                <span>Explore Collection →</span>
              </div>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="allino-slider-arrow allino-slider-next"
          onClick={() => scrollSlider(1)}
          aria-label="Scroll right"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}
