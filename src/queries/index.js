// Creating constants for querying
export const GET_CATEGORIES = `
  {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY = `
  query getCategory($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const GET_CURRENCIES = `
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT = `
query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`;
