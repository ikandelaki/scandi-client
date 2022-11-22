// Select category action creator
export const selectCategory = (category) => {
  return {
    type: "CATEGORY_SELECTED",
    payload: category,
  };
};

// Select a currency
export const selectCurrency = (currency) => {
  return {
    type: "CURRENCY_SELECTED",
    payload: currency,
  };
};

// Toggle currency dropdown
export const toggleCurrency = (bool) => {
  return {
    type: "TOGGLE_DROPDOWN",
    payload: bool,
  };
};

// Toggle cart dropdown
export const toggleCart = (bool) => {
  return {
    type: "TOGGLE_CART_DROPDOWN",
    payload: bool,
  };
};

// Add the item to cart
export const addToCart = (product, fromPDP) => {
  return {
    type: "ADD_TO_CART",
    payload: { product, fromPDP },
  };
};

// Remove the item from cart
export const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product,
  };
};

// Select the attribute of a cart item
export const selectAttribute = (
  product,
  itemId,
  attributeId,
  attributeItemId
) => {
  return {
    type: "SELECT_ATTRIBUTE",
    payload: {
      product,
      itemId,
      attributeId,
      attributeItemId,
    },
  };
};

// Add the product to pdp state.
export const addProductToPDP = (product) => {
  return {
    type: "ADD_TO_PDP",
    payload: product,
  };
};

// Select the product's attribute
export const selectProductAttribute = (
  product,
  attributeId,
  attributeItemId
) => {
  return {
    type: "SELECT_PRODUCT_ATTRIBUTE",
    payload: { product, attributeId, attributeItemId },
  };
};
