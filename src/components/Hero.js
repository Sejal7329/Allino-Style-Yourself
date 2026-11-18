import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          YOUR STYLE, YOUR STORY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Wear Your
          <br />
          <span>Own Vibe.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Discover fashion that feels like you.
          Explore the latest styles and make every
          day a little more fashionable.
        </motion.p>

        <motion.a
          href="#shop"
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Collection <FiArrowUpRight />
        </motion.a>

        <div className="hero-note">
          <span>01</span>
          <p>NEW SEASON · NEW YOU</p>
        </div>
      </div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000"
          alt="Allino fashion collection"
        />

        <motion.div
          className="floating-card"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>✦</span>
          <p>FASHION THAT<br />FEELS DIFFERENT.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;