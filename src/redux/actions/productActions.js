import * as productApi from '../../api';
import actionTypes from './actionTypes';

// Action Creators
export const fetchProductsRequest = () => ({
  type: actionTypes.FETCH_PRODUCTS_REQUEST
});

export const fetchProductsSuccess = (products, totalCount) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { products, totalCount }
});

export const fetchProductsFailure = (error) => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error
});

export const fetchProductDetailsRequest = () => ({
  type: actionTypes.FETCH_PRODUCT_DETAILS_REQUEST
});

export const fetchProductDetailsSuccess = (product) => ({
  type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product
});

export const fetchProductDetailsFailure = (error) => ({
  type: actionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
  payload: error
});

export const searchProductsRequest = () => ({
  type: actionTypes.SEARCH_PRODUCTS_REQUEST
});

export const searchProductsSuccess = (products, totalCount) => ({
  type: actionTypes.SEARCH_PRODUCTS_SUCCESS,
  payload: { products, totalCount }
});

export const searchProductsFailure = (error) => ({
  type: actionTypes.SEARCH_PRODUCTS_FAILURE,
  payload: error
});

// Thunk Actions
export const fetchProducts = (page = 1, limit = 8, filters = {}) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const result = await productApi.fetchProducts(page, limit, filters);
      dispatch(fetchProductsSuccess(result.products, result.totalCount));
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch products';
      dispatch(fetchProductsFailure(errorMessage));
    }
  };
};

export const fetchProductsByCategory = (category, page = 1, limit = 8, filters = {}) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const result = await productApi.fetchProductsByCategory(category, page, limit, filters);
      dispatch(fetchProductsSuccess(result.products, result.totalCount));
    } catch (error) {
      const errorMessage = error.message || `Failed to fetch products in category: ${category}`;
      dispatch(fetchProductsFailure(errorMessage));
    }
  };
};

export const fetchProductDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchProductDetailsRequest());
    try {
      const product = await productApi.fetchProductById(id);
      dispatch(fetchProductDetailsSuccess(product));
    } catch (error) {
      const errorMessage = error.message || `Failed to fetch product details`;
      dispatch(fetchProductDetailsFailure(errorMessage));
    }
  };
};

export const searchProducts = (query, page = 1, limit = 8) => {
  return async (dispatch) => {
    dispatch(searchProductsRequest());
    try {
      const result = await productApi.searchProducts(query, page, limit);
      console.log("Search API Response:", result);
      dispatch(searchProductsSuccess(result.products, result.totalCount));
    } catch (error) {
      console.error("Search API Error:", error);
      const errorMessage = error.message || `Failed to search products`;
      dispatch(searchProductsFailure(errorMessage));
    }
  };
}; 