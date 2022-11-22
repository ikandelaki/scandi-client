import { combineReducers } from "redux";

// Select a category
const selectedCategoryReducer = (selectedCategory = "all", action) => {
  if (action.type === "CATEGORY_SELECTED") {
    return action.payload;
  }

  return selectedCategory;
};

// Select a currency
const selectedCurrencyReducer = (selectedCurrency = "$", action) => {
  if (action.type === "CURRENCY_SELECTED") {
    return action.payload;
  }

  return selectedCurrency;
};

// Toggle currency dropdown
const dropdownReducer = (dropdownOpen = false, action) => {
  if (action.type === "TOGGLE_DROPDOWN") {
    return action.payload;
  }

  return dropdownOpen;
};

// Toggle cart dropdown
const cartDropdownReducer = (dropdownOpen = false, action) => {
  if (action.type === "TOGGLE_CART_DROPDOWN") {
    return action.payload;
  }

  return dropdownOpen;
};

const initialCart = {
  cartItems: [],
};

// Add item to cart or remove item from cart
const cartReducer = (cart = initialCart, action) => {
  // Add item to cart
  if (action.type === "ADD_TO_CART") {
    const payload = action.payload.product;

    // If the product has attributes AND was added from the category page, we want to set the selected
    // property of all the first cart attributes' items to true and false to every other
    if (
      payload.attributes.length &&
      !payload.attributes[0].items[0].hasOwnProperty("selected")
    ) {
      payload.attributes.forEach((attribute) => {
        attribute.items.forEach((attrItem, i) => {
          i === 0 ? (attrItem.selected = true) : (attrItem.selected = false);
        });
      });
    }
    const items = cart.cartItems.filter((product) => product.id === payload.id);
    // A variable to determine whether the item with the same selected attributes already exists
    let itemAlreadyExists = false;

    // If there are items with the same id, we want to determine whether that item is unique
    // (It's the only one that has the selected attributes the way it has)
    // And return that item with quantity: 1, or if it already exists we want to increase the quantity
    if (items.length) {
      const sameItem = items.find(
        (item) =>
          JSON.stringify(item.attributes) === JSON.stringify(payload.attributes)
      );

      if (sameItem) itemAlreadyExists = true;

      // If the item with same selected attributes already exits, we want to increase the quantity
      if (itemAlreadyExists) {
        return {
          ...cart,
          cartItems: cart.cartItems.map((cartItem) => {
            if (JSON.stringify(cartItem) === JSON.stringify(sameItem)) {
              return { ...sameItem, quantity: sameItem.quantity + 1 };
            } else {
              return { ...cartItem };
            }
          }),
        };

        // If the item with the same selected attributes does not already exist, we want to add a new product
      } else {
        const newProduct = { ...payload, quantity: 1 };
        return { ...cart, cartItems: [...cart.cartItems, newProduct] };
      }

      // If there are no matches we should just return the cart with the new item
    } else {
      const newProduct = { ...payload, quantity: 1 };
      return { ...cart, cartItems: [...cart.cartItems, newProduct] };
    }
  }

  // Remove item from cart if the quantity is 1
  // or reduce the quantity if there's more than one
  if (action.type === "REMOVE_FROM_CART") {
    const { payload } = action;
    // We want to find the item that has the same exact attributes selected to operate on it
    const item = cart.cartItems.find(
      (item) =>
        JSON.stringify(item.attributes) === JSON.stringify(payload.attributes)
    );

    // If the quantity of the item is more than one, we just want to decrease it
    if (item.quantity > 1) {
      return {
        ...cart,
        cartItems: cart.cartItems.map((item) => {
          if (
            JSON.stringify(item.attributes) ===
            JSON.stringify(payload.attributes)
          ) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
      // If the quantity of the item is equal to one, we want to remove it completely
    } else {
      return {
        ...cart,
        cartItems: cart.cartItems.filter(
          (item) =>
            JSON.stringify(item.attributes) !==
            JSON.stringify(payload.attributes)
        ),
      };
    }
  }

  return cart;
};

// Reducer of a product that was selected for a pdp page
// By default we set the first attribute to be selected
const productReducer = (pdp = {}, action) => {
  if (action.type === "ADD_TO_PDP") {
    const { payload } = action;
    const item = {
      ...payload,
      attributes: payload.attributes.map((attribute) => {
        return {
          ...attribute,
          items: attribute.items.map((item, i) => {
            if (i === 0) {
              return {
                ...item,
                selected: true,
              };
            } else {
              return {
                ...item,
                selected: false,
              };
            }
          }),
        };
      }),
    };
    return { ...pdp, product: item };
  }

  // Select the attribute of a product from a product page
  if (action.type === "SELECT_PRODUCT_ATTRIBUTE") {
    const { payload } = action;
    const itemSpread = {
      ...payload.product,
      attributes: payload.product.attributes.map((attribute) => {
        if (attribute.id === payload.attributeId) {
          return {
            ...attribute,
            items: attribute.items.map((item) => {
              if (item.id === payload.attributeItemId) {
                return {
                  ...item,
                  selected: true,
                };
              } else {
                return {
                  ...item,
                  selected: false,
                };
              }
            }),
          };
        } else {
          return {
            ...attribute,
          };
        }
      }),
    };

    return { ...pdp, product: itemSpread };
  }

  return pdp;
};

export default combineReducers({
  category: selectedCategoryReducer,
  currency: selectedCurrencyReducer,
  currencyOpen: dropdownReducer,
  cart: cartReducer,
  cartOpen: cartDropdownReducer,
  product: productReducer,
});
