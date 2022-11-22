import React from "react";
import "./ProductDescription.css";

// Importing an initialized function and a constant for querying
import queryFetch from "../api/queryFetch";
import { GET_PRODUCT } from "../queries";

// Importing actions
import { addProductToPDP } from "../actions";
import { selectProductAttribute } from "../actions";
import { addToCart } from "../actions";

// Importing connect to map the state to props
import { connect } from "react-redux";

class ProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImageId: 0,
      renderPage: false,
    };
  }

  // Fetch the data about the product depending on the url
  componentDidMount() {
    // Fetching the product by the id that was passed down
    const id = this.props.match.params.id;
    queryFetch(GET_PRODUCT, {
      id: id,
    }).then((data) => this.props.addProductToPDP(data.data.product));
  }

  // Render the small images aside
  renderImages = () => {
    if (!this.props.product.product) return;
    return this.props.product.product.gallery.map((image, i) => {
      return (
        <div
          key={i}
          id={i}
          className="pdp-image"
          onClick={() => this.setState({ selectedImageId: i })}
        >
          <img src={image} alt="" />
        </div>
      );
    });
  };

  // Render the selected image in the middle of the page
  renderSelectedImage = () => {
    if (!this.props.product.product) return;

    return this.props.product.product.gallery.map((image, i) => {
      if (i === this.state.selectedImageId) {
        return <img key={i} src={image} className="selected-image" alt="" />;
      }

      return null;
    });
  };

  // Render the attributes of a product
  renderAttributes = (attribute) => {
    return (
      <div key={attribute.id} className="pdp-attribute-single">
        <span className="pdp-attribute">{attribute.name}:</span>
        <ul className={`pdp-list ${attribute.type}`}>
          {attribute.items.map((attrItem) => {
            if (attribute.type === "text") {
              return (
                <li
                  key={attrItem.id}
                  className={`${attrItem.selected ? "active" : ""}`}
                  onClick={() =>
                    this.props.selectProductAttribute(
                      this.props.product.product,
                      attribute.id,
                      attrItem.id
                    )
                  }
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
                  onClick={() =>
                    this.props.selectProductAttribute(
                      this.props.product.product,
                      attribute.id,
                      attrItem.id
                    )
                  }
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
  };

  // Render the details like brand, name, price, add to cart
  renderProductDetails = () => {
    const product = this.props.product.product;
    if (!product) return;

    return (
      <div className="pdp-details">
        <div className="pdp-title">
          <h1>{product.brand}</h1>
          <h2>{product.name}</h2>
        </div>
        <div className="pdp-attributes">
          {product.attributes.map((attribute, i) => {
            return <div key={i}>{this.renderAttributes(attribute)}</div>;
          })}
        </div>
        <div className="pdp-price">
          <span className="pdp-attribute">Price:</span>
          {product.prices.map((price, i) => {
            return price.currency.symbol === this.props.currency ? (
              <div className="pdp-price-amount" key={i}>
                {price.currency.symbol}
                {price.amount}
              </div>
            ) : null;
          })}
        </div>
        {product.inStock ? (
          <div
            className="pdp-add-to-cart"
            onClick={() =>
              this.props.addToCart(this.props.product.product, true)
            }
          >
            Add to cart
          </div>
        ) : null}
        <div
          className="pdp-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    );
  };

  render() {
    return (
      <div className="pdp pdp-grid">
        <div ref={this.imageRef} className="pdp-images-container">
          {this.renderImages()}
        </div>
        <div className="selected-image-container">
          {this.renderSelectedImage()}
        </div>
        {this.renderProductDetails()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { product: state.product, currency: state.currency };
};

export default connect(mapStateToProps, {
  addProductToPDP,
  selectProductAttribute,
  addToCart,
})(ProductDescription);
