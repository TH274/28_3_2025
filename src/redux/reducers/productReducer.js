import actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  product: null,
  searchResults: [],
  loading: false,
  searchLoading: false,
  error: null,
  totalProducts: 0,
  itemsPerPage: 16,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalCount,
        error: null
      };
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null
      };
    case actionTypes.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        searchLoading: true,
        error: null
      };
    case actionTypes.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchResults: action.payload.products,
        totalProducts: action.payload.totalCount,
        error: null
      };
    case actionTypes.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        searchLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default productReducer; 