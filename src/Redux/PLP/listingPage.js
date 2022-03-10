/* eslint-disable */

const FETCH_PRODUCTS = 'store/listingPage/FETCH_PRODUCTS';
const UPDATE_LOADINGSTATE = 'store/listingPage/UPDATE_LOADINGSTATE';
const FILTER_CONTROL = 'store/listingPage/FILTER_CONTROL';
const CHANGE_CURRENCY = 'store/listingPage/CURRENCY_CHANGE';
const SELECT_ATTRIBUTE = 'store/listingPage/SELECT_ATTRIBUTE';
const ADD_TO_CART = 'store/listingPage/ADD_T0_CART';
const REMOVE_FROM_CART = 'store/listingPage/REMOVE_FROM_CART';
const INCREASE_QUANTITY = 'store/listingPage/INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'store/listingPage/DECREASE_QUANTITY';
const DISPLAY_CART = 'store/listingPage/DISPLAY_CART';
const VIEW_PRODUCT_DETAILS = 'store/listingPage/VIEW_PRODUCT_DETAILS';
const CONTROL_IMAGE_VIEW = 'store/listingpage/CONTROL_IMAGE_VIEW';

const calculateTotalInCart = (cart) => {
  let totalPrice = 0;
  let selectedPrice = '';
  if (cart.length > 0) {
    cart.forEach((product) => {
      selectedPrice = product.prices.filter((price) => price.selected === true);
      if (selectedPrice.length > 0) {
        const price = product.quantity * selectedPrice[0].amount;
        totalPrice += price;
      } else {
        selectedPrice = product.prices[0];
        const price = product.quantity * selectedPrice.amount;
        totalPrice += price;
      }
    });
  }
  return totalPrice.toFixed(2);
};

const initialState = {
  cartOverlay: false,
  products: [],
  isLoading: true,
  shoppingCart: [],
  imageControl: 0,
  total: 0,
};

const productQuery = `{
    categories {
        name
        products {
          id
          name
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          inStock
          gallery
          category
          description
          attributes {
            id
            name
            items {
              displayValue
              value
              id
            }
          }
        }
      }
}`;

const fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  payload: products,
});

export const displayOverlay = () => ({
  type: DISPLAY_CART,

});

export const controlFilter = (name) => ({
  type: FILTER_CONTROL,
  payload: name,
});

export const changeCurrency = (currency) => ({
  type: CHANGE_CURRENCY,
  payload: currency,
});

export const attrSelector = (attrName) => ({
  type: SELECT_ATTRIBUTE,
  payload: attrName,
});

export const addProductToCart = (productName) => ({
  type: ADD_TO_CART,
  payload: productName,
});

export const removeFromCart = (productName) => ({
  type: REMOVE_FROM_CART,
  payload: productName,
});

export const addQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId,
});

export const reduceQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const viewProductDetails = (productId) => ({
  type: VIEW_PRODUCT_DETAILS,
  payload: productId,
});

export const controlImage = (details) => ({
  type: CONTROL_IMAGE_VIEW,
  payload: details,
});

const setLoadingState = (payload) => ({
  type: UPDATE_LOADINGSTATE,
  payload,
});


export const getProducts = () => async (dispatch) => {
  const products = await fetch('http://localhost:4000',
    {
      method: 'POST',
      body: JSON.stringify({ query: productQuery }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
  const response = await products.json();
  dispatch(fetchProducts(response.data));
  dispatch(setLoadingState(false));
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADINGSTATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DISPLAY_CART:
      return {
        ...state,
        cartOverlay: !state.cartOverlay,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.categories.map((category) => ({
          ...category,
          selected: false,
          products: category.products.map((product) => ({
            ...product,
            selected: false,
            prices: product.prices.map((price) => ({
              ...price,
              selected: false,
            })),
            attributes: product.attributes.map((attr) => ({
              ...attr,
              items: attr.items.map((item) => ({
                ...item,
                selected: false,
              })),
            })),
          })),
        })),
      };
    case FILTER_CONTROL:
      const filteredData = state.products.map((product) => {
        if (product.name === action.payload) {
          return {
            ...product,
            selected: true,
          };
        }

        return {
          ...product,
          selected: false,
        };
      });

      return {
        ...state,
        products: filteredData,
        cartOverlay: false,
      };

    case CHANGE_CURRENCY:
      const changedCurrency = state.products.map((product) => {
        product.products.forEach((item) => {
          item.prices.forEach((price) => {
            if (price.currency.symbol === action.payload) {
              price.selected = true;
            } else {
              price.selected = false;
            }
          });
          return item;
        });
        return product;
      });
      return {
        ...state,
        products: changedCurrency,
        total: calculateTotalInCart(state.shoppingCart),
      };

    case SELECT_ATTRIBUTE:
      const selectAttribute = state.products.map((product) => {
        product.products.forEach((item) => {
          item.attributes.forEach((attribute) => {
            attribute.items.forEach((value) => {
              if (value.displayValue === action.payload) {
                attribute.items.forEach((val) => {
                  if (val !== value) {
                    val.selected = false;
                  }
                });
                value.selected = true;
              }
            });
            return attribute;
          });
          return item;
        });
        return product;
      });

      return {
        ...state,
        products: selectAttribute,
      };

    case ADD_TO_CART:
      const getSelectedProduct = state.products.map((product) => product.products.filter((selected) => selected.name === action.payload));

      getSelectedProduct[0].map((product) => {
        if (product.inStock) {
          if (product.attributes.length === 0) {
            if (!state.shoppingCart.includes(product)) {
              state.shoppingCart.push({
                ...product,
                quantity: 1,
                selected: true,
              });
            }
          } else {
            let isAttributeSelected = '';
            product.attributes.forEach((attribute) => {
              isAttributeSelected = attribute.items.some((value) => value.selected === true);
              return attribute;
            });
            if (isAttributeSelected) {
              if (!state.shoppingCart.includes(product)) {
                state.shoppingCart.push({
                  ...product,
                  quantity: 1,
                  selected: true,
                });
              }
            }
          }
        }
        return product;
      });
      return {
        ...state,
        shoppingCart: state.shoppingCart,
        total: calculateTotalInCart(state.shoppingCart),
        cartOverlay: false,
      };
    case REMOVE_FROM_CART:
      const filteredCart = state.shoppingCart.filter((product) => product.name !== action.payload);
      return {
        ...state,
        shoppingCart: filteredCart,
        total: calculateTotalInCart(filteredCart),
        cartOverlay: false,

      };
    case INCREASE_QUANTITY: {
      const product = state.shoppingCart.map((product) => {
        if (product.id === action.payload) {
          product.quantity += 1;
        }
        return product;
      });
      return {
        ...state,
        shoppingCart: product,
        total: calculateTotalInCart(state.shoppingCart),
      };
    }
    case DECREASE_QUANTITY: {
      const product = state.shoppingCart.map((product) => {
        if (product.id === action.payload) {
          product.quantity -= 1;
          if (product.quantity < 1) {
            product.quantity = 1;
          }
        }
        return product;
      });
      return {
        ...state,
        shoppingCart: product,
        total: calculateTotalInCart(state.shoppingCart),
      };
    }
    case VIEW_PRODUCT_DETAILS:
      const selectedProduct = state.products.map((product) => {
        product.products.map((item) => {
          if (item.id === action.payload) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        return product;
      });
      return {
        ...state,
        cartOverlay: false,
        products: selectedProduct,
        imageControl: 0,
      };
    case CONTROL_IMAGE_VIEW:
      if (action.payload.action === 'right') {
        state.imageControl += 1;
        if (state.imageControl > action.payload.length - 1) {
          state.imageControl = 0;
        }
      } else {
        state.imageControl -= 1;
        if (state.imageControl < 0) {
          state.imageControl = action.payload.length - 1;
        }
      }
      return {
        ...state,
        cartOverlay: false,
      };
    default:
      return state;
  }
};

export default productListReducer;
