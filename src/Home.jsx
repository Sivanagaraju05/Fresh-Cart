import React from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaDrumstickBite,
  FaCheese,
  FaTruck,
  FaShieldAlt,
  FaShoppingBasket,
} from "react-icons/fa";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="home-hero">
        <h1>
          Fresh <span>Groceries</span> <br /> Delivered Daily
        </h1>
        <p>
          Fresh vegetables, quality non-veg & daily milk essentials — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/veg" className="btn primary">Start Shopping</Link>
          <Link to="/aboutus" className="btn secondary">About Fresh Cart</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="feature-box">
          <FaTruck />
          <h3>Fast Delivery</h3>
          <p>Quick & reliable doorstep delivery</p>
        </div>

        <div className="feature-box">
          <FaShieldAlt />
          <h3>Trusted Quality</h3>
          <p>Fresh & quality-checked items</p>
        </div>

        <div className="feature-box">
          <FaShoppingBasket />
          <h3>Easy Shopping</h3>
          <p>Simple & smooth ordering experience</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          <Link to="/veg" className="category-tile veg">
            <FaLeaf />
            <h3>Fresh Vegetables</h3>
            <p>Farm-fresh greens & veggies</p>
          </Link>

          <Link to="/nonveg" className="category-tile nonveg">
            <FaDrumstickBite />
            <h3>Non-Veg</h3>
            <p>Fresh meat & seafood</p>
          </Link>

          <Link to="/milk" className="category-tile milk">
            <FaCheese />
            <h3>Milk & Dairy</h3>
            <p>Daily dairy essentials</p>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Fresh Cart. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
