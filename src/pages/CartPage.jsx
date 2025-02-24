import React, { useState } from 'react';
import Layout from '../components/Layouts/Layout';
import { Button, Typography, CircularProgress } from '@mui/material';
import { useCart } from '../store/UseCart';
import { useAuth } from '../store/Auth';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, price, discountedPrice, discount, rating, images, stock: availableStock }) => (
  <div className="product-card">
    {images && images.length > 0 && (
      <img src={images[0].url} alt={title} className="product-image" />
    )}
    <div className="product-info">
      <h3 className="product-title">{title}</h3>
      <div className="product-price">
        <span className="original-price">₹{price}</span>
        {discountedPrice && (
          <span className="discounted-price">₹{discountedPrice}</span>
        )}
      </div>
      {discount && <span className="discount-badge">{discount}% OFF</span>}
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
      {/* Display available stock status from the product */}
      <span className={`stock-status ${availableStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
        {availableStock > 0 ? 'In Stock' : 'Out of Stock'}
      </span>
    </div>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, AuthorizationToken } = useAuth();
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Remove item from cart
  const removeItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Handle stock change (replacing quantity)
  const handleStockChange = (e, pid) => {
    const newStock = parseInt(e.target.value);
    if (newStock < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, stock: newStock } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price using purchase amount stored in "stock"
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.stock ?? 1), 0)
      .toFixed(2);
  };

  // Handle payment – send "stock" field to backend instead of "quantity"
  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use "stock" field from each cart item; if missing, default to 1.
      const cartForPayment = cart.map((item) => ({
        product: item._id,
        stock: item.stock ?? 1,
        price: item.price,
      }));

      const paymentData = { cart: cartForPayment };

      const response = await fetch('https://gagan-server.onrender.com/api/v1/product/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken, // token is already formatted with "Bearer "
        },
        body: JSON.stringify(paymentData),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }
      console.log('Payment response data:', data);

      if (response.ok && data.ok) {
        setCart([]);
        localStorage.removeItem('cart');
        alert('Payment successful!');
      } else {
        setError(data.message || 'Payment failed!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          {isLoggedIn ? (
            <p className="cart-count">
              {cart.length > 0
                ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'}
            </p>
          ) : (
            <p className="login-message">
              Please login first to proceed with payment.
            </p>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <ProductCard
                    title={item.name}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    discount={item.discount}
                    rating={item.rating}
                    images={item.images}
                    // For display purposes, we pass the product's available stock (if available)
                    stock={item.product?.stock || item.stock || 0}
                  />
                  <div className="item-actions">
                    <input
                      type="number"
                      value={item.stock ?? 1}
                      onChange={(e) => handleStockChange(e, item._id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button onClick={() => removeItem(item._id)} className="remove-button">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={() => navigate('/')}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>

            <Button
              className="pay-button"
              onClick={handlePayment}
              disabled={loading || cart.length === 0 || !isLoggedIn}
            >
              {loading ? <CircularProgress size={24} /> : 'Proceed to Checkout'}
            </Button>
            {!isLoggedIn && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                Please login first to proceed with payment.
              </Typography>
            )}
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
