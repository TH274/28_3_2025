import * as orderApi from '../../api';
import { clearCart } from './cartActions';
import actionTypes from './actionTypes';

// Action Creators
export const fetchOrdersRequest = () => ({
  type: actionTypes.FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILURE,
  payload: error
});

export const fetchOrderDetailsRequest = () => ({
  type: actionTypes.FETCH_ORDER_DETAILS_REQUEST
});

export const fetchOrderDetailsSuccess = (order) => ({
  type: actionTypes.FETCH_ORDER_DETAILS_SUCCESS,
  payload: order
});

export const fetchOrderDetailsFailure = (error) => ({
  type: actionTypes.FETCH_ORDER_DETAILS_FAILURE,
  payload: error
});

export const createOrderRequest = () => ({
  type: actionTypes.CREATE_ORDER_REQUEST
});

export const createOrderSuccess = (order) => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
  payload: order
});

export const createOrderFailure = (error) => ({
  type: actionTypes.CREATE_ORDER_FAILURE,
  payload: error
});

// Thunk Actions
export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
      const orders = await orderApi.fetchOrders();
      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
    }
  };
};

export const fetchOrderDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchOrderDetailsRequest());
    try {
      const order = await orderApi.fetchOrderById(id);
      dispatch(fetchOrderDetailsSuccess(order));
    } catch (error) {
      dispatch(fetchOrderDetailsFailure(error.message));
    }
  };
};

export const createOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const order = await orderApi.createOrder(orderData);
      dispatch(createOrderSuccess(order));
      
      dispatch(clearCart());
      
      return order;
    } catch (error) {
      dispatch(createOrderFailure(error.message));
      throw error;
    }
  };
}; 