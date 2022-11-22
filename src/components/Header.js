import React from "react";
import "./Header.css";

// Importing connect to map the state to props
import { connect } from "react-redux";

// Importing link to route around the page
import { Link } from "react-router-dom";

// Importing the initialized function for querying
import { GET_CATEGORIES } from "../queries";
import queryFetch from "../api/queryFetch.js";

// importing action creators
import { selectCategory } from "../actions";
import { selectCurrency } from "../actions";
import { toggleCurrency } from "../actions";
import { toggleCart } from "../actions";

// Importing svgs
import { ReactComponent as HeaderLogo } from "../images/logo-transparent.svg";
import { ReactComponent as CartLogo } from "../images/shopping-cart.svg";
import { ReactComponent as DropdownLogo } from "../images/dropdown-icon.svg";

class Header extends React.Component {
  state = { data: null };

  // Event listener to body to close the currency menu
  componentDidMount() {
    document.addEventListener("mousedown", (e) => {
      if (
        !e.target.closest(".currency") &&
        !e.target.closest(".currency-switcher")
      ) {
        this.props.toggleCurrency(false);
      }
    });

    // Fetching the categories and storing them to data
    queryFetch(GET_CATEGORIES).then((result) =>
      this.setState({ data: result.data })
    );
  }

  // Calculating the total quantity of the items added to cart
  cartItemQuantity = () => {
    return this.props.cart.reduce(
      (cur, cartItem) => cur + cartItem.quantity,
      0
    );
  };

  // Rendering the categories in the header
  renderCategories = () => {
    if (!this.state.data) return;
    return this.state.data.categories.map((category, i) => {
      return (
        <Link to="/" className="category-link" key={i}>
          <li
            className={`${
              category.name === this.props.category ? "selected" : ""
            }`}
            onClick={() => this.props.selectCategory(category.name)}
          >
            {category.name}
          </li>
        </Link>
      );
    });
  };

  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <HeaderLogo />
        </div>
        <nav className="header-navigation">{this.renderCategories()}</nav>
        <div className="header-actions">
          <div
            className="currency"
            onClick={() => {
              this.props.toggleCurrency(!this.props.currencyOpen);
              this.props.toggleCart(false);
            }}
          >
            <div className="currency-sign">{this.props.currency}</div>
            <div>
              <DropdownLogo />
            </div>
          </div>
          <div
            className="shopping-cart"
            onClick={() => {
              this.props.toggleCart(!this.props.cartOpen);
              this.props.toggleCurrency(false);
            }}
          >
            <CartLogo />
            {this.cartItemQuantity() ? (
              <div className="cart-item-count">{this.cartItemQuantity()}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    currency: state.currency,
    currencyOpen: state.currencyOpen,
    cartOpen: state.cartOpen,
    cart: state.cart.cartItems,
  };
};

export default connect(mapStateToProps, {
  selectCategory,
  selectCurrency,
  toggleCurrency,
  toggleCart,
})(Header);
