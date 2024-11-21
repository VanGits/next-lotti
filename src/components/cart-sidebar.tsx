import { useCart } from "@/app/context/CartContext";
import React, { useState } from "react";

const CartSidebar: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during checkout", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <button className="close-cart" onClick={() => setIsCartOpen(false)}>
        ×
      </button>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p id="empty">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} width={50} height={50} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
