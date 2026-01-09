import React from "react";
import "./AboutUs.css";
import {
  FaLeaf,
  FaDrumstickBite,
  FaCheese,
  FaTruck,
  FaShieldAlt,
  FaHeart
} from "react-icons/fa";

function AboutUs() {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>
          About <span className="highlight">Fresh Cart</span>
        </h1>
        <p>
          Fresh Cart is your trusted online grocery platform delivering
          **fresh vegetables, quality non-veg, and daily milk products**
          directly to your doorstep.
        </p>
      </section>

      {/* What We Offer */}
      <section className="about-offer">
        <h2>What We Offer</h2>

        <div className="offer-grid">
          <div className="offer-card">
            <FaLeaf className="offer-icon veg" />
            <h3>Fresh Vegetables</h3>
            <p>Farm-fresh vegetables handpicked every day.</p>
          </div>

          <div className="offer-card">
            <FaDrumstickBite className="offer-icon nonveg" />
            <h3>Quality Non-Veg</h3>
            <p>Hygienic meat & seafood with best quality.</p>
          </div>

          <div className="offer-card">
            <FaCheese className="offer-icon milk" />
            <h3>Milk & Dairy</h3>
            <p>Fresh milk, curd, butter & dairy essentials.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why">
        <h2>Why Choose Fresh Cart?</h2>

        <div className="why-grid">
          <div className="why-card">
            <FaTruck className="why-icon" />
            <p>Fast & reliable delivery</p>
          </div>

          <div className="why-card">
            <FaShieldAlt className="why-icon" />
            <p>Quality & safety guaranteed</p>
          </div>

          <div className="why-card">
            <FaHeart className="why-icon" />
            <p>Trusted by local customers</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© {new Date().getFullYear()} Fresh Cart. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default AboutUs;
