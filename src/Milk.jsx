import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Milk.css';
import { AddToCart } from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Milk() {
  const dispatch = useDispatch();
  const milkProducts = useSelector(state => state.products.milk);

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Price range options
  const priceRanges = [
    { value: 'RS 1 to RS 50', min: 1, max: 50 },
    { value: 'RS 51 to RS 100', min: 51, max: 100 },
    { value: 'RS 101 to RS 200', min: 101, max: 200 },
    { value: 'RS 201 to RS 500', min: 201, max: 500 },
    { value: 'More than RS 500', min: 501, max: Infinity }
  ];

  const activeRanges = priceRanges.filter(range =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts =
    selectedRanges.length === 0
      ? milkProducts
      : milkProducts.filter(product =>
          activeRanges.some(range =>
            product.price >= range.min && product.price <= range.max
          )
        );

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCheckboxChange = (rangeValue) => {
    if (selectedRanges.includes(rangeValue)) {
      setSelectedRanges(selectedRanges.filter(r => r !== rangeValue));
    } else {
      setSelectedRanges([...selectedRanges, rangeValue]);
    }
    setCurrentPage(1);
  };

  const milkListItems = currentProducts.map((product, index) => (
    <li key={index} className="milk-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button
        onClick={() => {
          dispatch(AddToCart(product));
          toast.success('Product added to cart Successfully');
        }}
      >
        Add to Cart
      </button>
    </li>
  ));

  return (
    <div className="milk-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 style={{ textAlign: 'center' }}>Milk Products</h1>

      {/* Price Filter */}
      <div className="price-filter">
        {priceRanges.map(range => (
          <label key={range.value}>
            <input
              type="checkbox"
              checked={selectedRanges.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            {range.value}
          </label>
        ))}
        <button onClick={() => setSelectedRanges([])}>
          Clear All Filters
        </button>
      </div>

      {/* Product List */}
      <ol className="milk-list">
        {milkListItems}
      </ol>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active-page' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => toast('Wow so easy!')}>
          Notify!
        </button>
      </div>
    </div>
  );
}

export default Milk;
