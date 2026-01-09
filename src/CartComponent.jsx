import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClearCart,
  OrderDetails,
  IncCart,
  DecCart,
  RemoveFromCart
} from './store';
import './CartComponent.css';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartComponent() {
  const cartObjects = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponCodeRef = useRef();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCouponApply = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    setCouponCode(code);

    switch (code) {
      case 'SIVA10':
        setCouponDiscountPercentage(10);
        break;
      case 'SIVA20':
        setCouponDiscountPercentage(20);
        break;
      case 'SIVA30':
        setCouponDiscountPercentage(30);
        break;
      default:
        toast.error('Invalid Coupon Code');
        setCouponDiscountPercentage(0);
    }
    couponCodeRef.current.value = '';
  };

  const calculateAmounts = () => {
    const totalPrice = cartObjects.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discountAmount = (discountPercentage / 100) * totalPrice;
    const afterDiscount = totalPrice - discountAmount;
    const couponDiscount = (couponDiscountPercentage / 100) * afterDiscount;
    const afterCoupon = afterDiscount - couponDiscount;
    const tax = (afterCoupon * 5) / 100;
    const shipping = 30;
    const finalAmount = afterCoupon + tax + shipping;

    return { totalPrice, discountAmount, couponDiscount, tax, shipping, finalAmount };
  };

  const {
    totalPrice,
    discountAmount,
    couponDiscount,
    tax,
    shipping,
    finalAmount
  } = calculateAmounts();

  const handlePaymentSuccess = () => {
    const orderDetails = {
      orderId: 'ORD-' + Date.now(),
      purchaseDateTime: new Date().toLocaleString(),
      items: [...cartObjects],
      finalAmount
    };

    dispatch(OrderDetails(orderDetails));
    dispatch(ClearCart());

    emailjs.send(
      'service_3jklrxc',
      'template_7gaersf',
      {
        order_id: orderDetails.orderId,
        email: customerEmail,
        total: finalAmount.toFixed(2)
      },
      'kbjkwoe8kOiTUmHg4'
    );

    setPaymentSuccessful(true);
    setTimeout(() => navigate('/orders'), 5000);
  };

  useEffect(() => {
    if (paymentSuccessful && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentSuccessful, countdown]);

  return (
    <div className="cart-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="cart-title">🛒 Cart Summary</h1>

      {cartObjects.length > 0 ? (
        <>
          <div className="cart-list">
            <div className="cart-header">
              <span>Image</span>
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span>Actions</span>
            </div>

            {cartObjects.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <span>₹{item.price}</span>

                <div className="quantity-box">
                  <button onClick={() => dispatch(DecCart(item))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(IncCart(item))}>+</button>
                </div>

                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="btn-remove"
                  onClick={() => dispatch(RemoveFromCart(item))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="summary-section">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>

            <div className="discount-buttons">
              <button onClick={() => setDiscountPercentage(10)}>10% Off</button>
              <button onClick={() => setDiscountPercentage(20)}>20% Off</button>
              <button onClick={() => setDiscountPercentage(30)}>30% Off</button>
            </div>

            <p>Discount: -₹{discountAmount.toFixed(2)}</p>

            <div className="coupon-section">
              <input ref={couponCodeRef} placeholder="Coupon Code" />
              <button onClick={handleCouponApply}>Apply</button>
            </div>

            <p>Coupon: -₹{couponDiscount.toFixed(2)}</p>
            <p>Tax (5%): ₹{tax.toFixed(2)}</p>
            <p>Shipping: ₹{shipping}</p>
            <h3>Final Amount: ₹{finalAmount.toFixed(2)}</h3>

            <input
              type="email"
              placeholder="Enter email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />

            <div className="payment-method">
              <button onClick={() => setPaymentMethod('qr')}>QR</button>
              <button onClick={() => setPaymentMethod('card')}>Card</button>
            </div>

            {paymentMethod === 'qr' && (
              <div className="qr-section">
                <QRCode value={`upi://pay?pa=6303336483@ybl&am=${finalAmount}`} />
                <button onClick={handlePaymentSuccess}>
                  I've Paid
                </button>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="card-section">
                <input placeholder="Card Number" />
                <input placeholder="Name" />
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
                <button onClick={handlePaymentSuccess}>
                  Pay Now
                </button>
              </div>
            )}
          </div>
        </>
      ) : paymentSuccessful ? (
        <h2 className="thank-you-message">
          Payment Successful! Redirecting in {countdown}s...
        </h2>
      ) : (
        <h2>Your cart is empty 🛒</h2>
      )}
    </div>
  );
}

export default CartComponent;
