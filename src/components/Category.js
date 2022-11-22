import React from "react";
import "./Category.css";

// Importing connect to map the state to props
import { connect } from "react-redux";

// Importing link for routing around the page
import { Link } from "react-router-dom";

// Importing constants and the initialized function for querying
import { GET_CATEGORY } from "../queries";
import queryFetch from "../api/queryFetch";

// Importing icon
import { ReactComponent as ShoppingIcon } from "../images/circle-icon.svg";

// Importing actions
import { addToCart } from "../actions";

class Category extends React.Component {
  state = { productHoverId: "", data: null };

  // Function for fetching the category data
  fetchCategory() {
    queryFetch(GET_CATEGORY, {
      title: this.props.category,
    }).then((result) => this.setState({ data: result.data }));
  }

  // Fetching the category data when page loads
  componentDidMount() {
    this.fetchCategory();
  }

  // Fetchin the category data when state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data === this.state.data) {
      this.fetchCategory();
    }
  }

  // Rendering the category based on the fetched data
  renderCategory = () => {
    if (!this.state.data) return;
    return this.state.data.category.products.map((product) => {
      return (
        <div
          className="product-card"
          key={product.id}
          onMouseEnter={() => this.onProductHover(product.id)}
          onMouseLeave={() => this.onProductLeave()}
        >
          <Link to={`product/${product.id}`} className="category-link">
            <div className="product-image">
              <img src={product.gallery[0]} alt="" />
              <div
                className={`${product.inStock ? "in-stock" : "out-of-stock"}`}
              >
                <p>OUT OF STOCK</p>
              </div>
            </div>
          </Link>
          <div
            className={`product-details ${
              product.inStock ? "" : "out-of-stock-details"
            }`}
          >
            <div className="product-title">
              {product.brand} {product.name}
            </div>
            <div className="product-price">
              {this.props.currency}{" "}
              {product.prices.map((price) =>
                price.currency.symbol === this.props.currency
                  ? price.amount
                  : null
              )}{" "}
            </div>
            {product.inStock ? (
              <div
                className={`shopping-icon ${
                  this.state.productHoverId === product.id
                    ? "shopping-icon-active"
                    : ""
                }`}
                onClick={() => this.props.addToCart(product)}
              >
                <ShoppingIcon />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  };

  // Controls the hover effects of the category-item
  onProductHover = (id) => {
    this.setState({ productHoverId: id });
  };

  // Controls the hover effects of the category-item
  onProductLeave = () => {
    this.setState({ productHoverId: "" });
  };

  render() {
    return (
      <div className="category">
        <h1>{this.props.category}</h1>
        <div className="grid-container--cards">{this.renderCategory()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    currency: state.currency,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart })(Category);
