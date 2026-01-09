import { useSelector } from 'react-redux';
import { useState } from 'react';
import './Orders.css';

function Orders() {
  const orders = useSelector((state) => state.orders);
  const [expandedOrderIndices, setExpandedOrderIndices] = useState({});

  const toggleOrderDetails = (index) => {
    setExpandedOrderIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders found 🛒</h2>
          <p>Please place an order to view it here.</p>
        </div>
      ) : (
        <>
          <h2 className="orders-title">📦 Order History</h2>
          <ul className="orders-list">
            {orders.map((order, index) => (
              <li key={index} className="order-card">
                <h3 className="order-id">
                  🆔 Order ID: {order.orderId}
                </h3>
                <p className="order-datetime">
                  📅 {order.purchaseDateTime}
                </p>
                <p className="order-amount">
                  💰 Final Amount: ₹{order.finalAmount}
                </p>

                <div className="order-actions">
                  <button onClick={() => toggleOrderDetails(index)}>
                    {expandedOrderIndices[index]
                      ? 'Hide Details'
                      : 'Show Details'}
                  </button>
                </div>

                {expandedOrderIndices[index] && (
                  <ul className="order-items">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="order-item">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Orders;
