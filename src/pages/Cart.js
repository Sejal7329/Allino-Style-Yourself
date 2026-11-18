
import React from "react";
import { Link } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

import { useShop } from "../Context/ShopContext";

export default function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShop();

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  const shipping = cartTotal >= 1999 ? 0 : 99;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="allino-cart-empty">
        <FiShoppingBag size={44} />
        <h1>Your Shopping Bag Is Empty</h1>
        <p>Find something beautiful to add to your bag.</p>
        <Link to="/">Continue Shopping →</Link>
      </main>
    );
  }

  return (
    <main className="allino-cart-page">
      <div className="allino-cart-container">
        <div className="allino-cart-heading">
          <h1>My Shopping Bag</h1>
          <p>
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </p>
        </div>

        <div className="allino-cart-layout">
          {/* LEFT: CART ITEMS */}
          <section className="allino-cart-items">
            {cart.map((item) => (
              <article
                className="allino-cart-item"
                key={item.cartKey}
              >
                <Link
                  to={`/product/${item.id}`}
                  className="allino-cart-item-image"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </Link>

                <div className="allino-cart-item-details">
                  <p className="allino-cart-item-category">
                    {item.category}
                  </p>

                  <Link
                    to={`/product/${item.id}`}
                    className="allino-cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p className="allino-cart-item-price">
                    {formatPrice(item.price)}
                  </p>

                  {(item.size || item.color) && (
                    <div className="allino-cart-variants">
                      {item.size && (
                        <p>
                          <strong>Size:</strong> {item.size}
                        </p>
                      )}

                      {item.color && (
                        <div className="allino-cart-color-row">
                          <strong>Color:</strong>
                          <span>{item.color}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="allino-cart-item-bottom">
                    <div className="allino-cart-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.cartKey)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.cartKey)
                        }
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="allino-cart-remove"
                      onClick={() =>
                        removeFromCart(item.cartKey)
                      }
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="allino-cart-line-total">
                  {formatPrice(
                    item.price * item.quantity
                  )}
                </strong>
              </article>
            ))}

            <Link
              to="/"
              className="allino-cart-continue"
            >
              ← Continue Shopping
            </Link>
          </section>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="allino-order-summary">
            <h2>Order Summary</h2>

            <div className="allino-summary-row">
              <span>
                Subtotal ({cartCount}{" "}
                {cartCount === 1 ? "item" : "items"})
              </span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <div className="allino-summary-row">
              <span>Shipping</span>
              <strong>
                {shipping === 0
                  ? "FREE"
                  : formatPrice(shipping)}
              </strong>
            </div>

            {shipping > 0 && (
              <p className="allino-shipping-note">
                Add {formatPrice(1999 - cartTotal)} more
                for free shipping.
              </p>
            )}

            <div className="allino-summary-divider" />

            <div className="allino-summary-total">
              <span>Total Amount</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <p className="allino-summary-tax-note">
              Final taxes and delivery charges, if
              applicable, will be confirmed at checkout.
            </p>

            <button
              type="button"
              className="allino-payment-button"
              onClick={() =>
                window.alert(
                  "Checkout and payment integration is coming next."
                )
              }
            >
              PROCEED TO PAYMENT
              <FiArrowRight />
            </button>

            <p className="allino-summary-secure">
              Secure checkout will be available when
              payment integration is complete.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
