import React from "react";
import "./Bag.css";

// importing action creators
import { addToCart, removeFromCart } from "../actions";

// Importing connect to map the state to props
import { connect } from "react-redux";

import Slider from "./Slider";

class Bag extends React.Component {
  // Render Attributes of a cart item
  renderAttributes = (item) => {
    return item.attributes.map((attribute, i) => {
      return (
        <div key={i} className="cart-attributes">
          <span className="cart-attribute">{attribute.name}:</span>
          <ul className={`cart-list ${attribute.type}`}>
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

  // Render the details about the cart item
  renderItems = () => {
    if (!this.props.cart) return;

    return this.props.cart.map((cartItem, i) => {
      return (
        <div className="bag-item-container" key={i}>
          <div className="bag-item-flex">
            <h2>{cartItem.brand}</h2>
            <h3>{cartItem.name}</h3>
            <span className="cart-item-price">
              {cartItem.prices.map((price) => {
                return price.currency.symbol === this.props.currency
                  ? price.currency.symbol + "" + price.amount
                  : null;
              })}
            </span>
            {this.renderAttributes(cartItem)}
          </div>
          {this.renderImageAndQuantity(cartItem)}
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
            className="change-quantity-cart"
            onClick={() => this.props.addToCart(item)}
          >
            +
          </div>
          <div className="cart-item-quantity">{item.quantity}</div>
          <div
            className="change-quantity-cart"
            onClick={() => this.props.removeFromCart(item)}
          >
            -
          </div>
        </div>
        <div className="product-picture-cart">
          <Slider gallery={item.gallery} />
        </div>
      </div>
    );
  };

  // Calculating the total price of items in cart
  totalPrice = () => {
    const prices = [];
    this.props.cart.forEach((cartItem) => {
      cartItem.prices.forEach((price) => {
        return price.currency.symbol === this.props.currency
          ? prices.push(price.amount * cartItem.quantity)
          : null;
      });
    });
    return prices.reduce((cur, price) => cur + price).toFixed(2);
    // Make the price look better by putting commas after every thousand
  };

  render() {
    return (
      <div className="bag-container">
        <h1>Cart</h1>
        <div className="bag-flex">{this.renderItems()}</div>
        {this.props.cart.length ? (
          <div className="order-items">
            <div>
              <span>Tax 21%:</span>
              <span>Quantity:</span>
              <span>Total:</span>
            </div>
            <div className="order-values">
              {/* Tax value */}
              <span>
                {this.props.currency}
                {((this.totalPrice() * 21) / 100).toFixed(2)}
              </span>
              {/* Number of items */}
              <span>
                {this.props.cart.reduce(
                  (cur, cartItem) => cur + cartItem.quantity,
                  0
                )}
              </span>
              {/* Price of items */}
              <span>
                {this.props.currency}
                {this.totalPrice()}
              </span>
            </div>
            <div className="order-btn">Order</div>
          </div>
        ) : (
          <p>There are no items in cart</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart.cartItems, currency: state.currency };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
})(Bag);
