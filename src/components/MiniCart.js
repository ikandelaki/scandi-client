import React from "react";
import "./MiniCart.css";

// Importing connect to map the state to props
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../actions";
import { toggleCart } from "../actions";
import { removeFromCart } from "../actions";

class MiniCart extends React.Component {
  // Control the shopping cart toggle
  componentDidMount() {
    document.body.addEventListener("mousedown", (e) => {
      if (
        !e.target.closest(".shopping-cart") &&
        !e.target.closest(".mini-cart")
      ) {
        this.props.toggleCart(false);
      }
    });
  }

  // Render Attributes of the cart item
  renderAttributes = (item) => {
    return item.attributes.map((attribute) => {
      return (
        <div key={attribute.id} className="product-attributes">
          <span className="product-attribute">{attribute.name}:</span>
          <ul className={`product-list ${attribute.type}`}>
            {attribute.items.map((attrItem) => {
              if (attribute.type === "text") {
                return (
                  <li
                    key={attrItem.id}
                    className={`${attrItem.selected ? "active" : ""}`}
                  >
                    {attrItem.value}
                  </li>
                );
              } else if (attribute.type === "swatch") {
                return (
                  <li
                    key={attrItem.id}
                    style={{ backgroundColor: attrItem.value }}
                    className={`${attrItem.selected ? "active" : ""}`}
                  >
                    {" "}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      );
    });
  };

  // Render image and quantity regulator of the cart item
  renderImageAndQuantity = (item) => {
    return (
      <div className="product-quantity-picture">
        <div className="product-quantity">
          <div
            className="change-quantity"
            onClick={() => this.props.addToCart(item)}
          >
            +
          </div>
          <div>{item.quantity}</div>
          <div
            className="change-quantity"
            onClick={() => this.props.removeFromCart(item)}
          >
            -
          </div>
        </div>
        <div className="product-picture">
          <Link
            to={`/product/${item.id}`}
            onClick={() => this.props.toggleCart(false)}
          >
            <img src={item.gallery[0]} alt="" />
          </Link>
        </div>
      </div>
    );
  };

  // Render the cart items
  renderItems() {
    return this.props.cart.map((item, i) => {
      // if (!item.length) return;
      return (
        <div key={i} className="cart-product">
          {/* Rendering the item name and the price */}
          <div className="cart-product-description">
            <h4>{item.brand}</h4>
            <h4>{item.name}</h4>
            <span className="product-price">
              {item.prices.map((price) =>
                price.currency.symbol === this.props.currency
                  ? `${price.currency.symbol}${price.amount}`
                  : null
              )}
            </span>
            {/* Rendering the attributes like size capacity etc. */}
            {this.renderAttributes(item)}
          </div>
          {/* Rendering the image and the adjustment of quantity */}
          {this.renderImageAndQuantity(item)}
        </div>
      );
    });
  }

  // Calculating the total price of items in cart
  totalPrice = () => {
    const prices = [];
    this.props.cart.forEach((cartItem) => {
      // if (!cartItem.length) return;
      cartItem.prices.forEach((price) => {
        return price.currency.symbol === this.props.currency
          ? prices.push(price.amount * cartItem.quantity)
          : null;
      });
    });

    // if (!prices.length) return;
    const price = prices.reduce((cur, price) => cur + price).toFixed(2);
    return price;
  };

  render() {
    return (
      <div
        className={`mini-cart-container ${this.props.cartOpen ? "active" : ""}`}
      >
        <div
          className={`mini-cart ${this.props.cartOpen ? "active" : ""}`}
          ref={this.miniCartRef}
        >
          <h3 className="cart-title">
            <span>My Bag,</span>{" "}
            <span>
              {this.props.cart.reduce(
                (cur, cartItem) => cur + cartItem.quantity,
                0
              )}{" "}
              items
            </span>
          </h3>
          <div className="cart-products-container">{this.renderItems()}</div>
          {this.props.cart[0] ? (
            <div>
              <div className="total-price">
                <span>Total</span>
                <span>
                  {this.props.currency}
                  {this.totalPrice()}
                </span>
              </div>
              <div className="view-checkout">
                <Link
                  to="/cart"
                  className="bag-link"
                  onClick={() => this.props.toggleCart(false)}
                >
                  View Bag
                </Link>
                <div>Check out</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartItems,
    cartOpen: state.cartOpen,
    currency: state.currency,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  toggleCart,
})(MiniCart);
