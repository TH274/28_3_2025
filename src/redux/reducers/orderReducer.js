import actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_REQUEST:
    case actionTypes.FETCH_ORDER_DETAILS_REQUEST:
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null
      };
    case actionTypes.FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload],
        order: action.payload,
        error: null
      };
    case actionTypes.FETCH_ORDERS_FAILURE:
    case actionTypes.FETCH_ORDER_DETAILS_FAILURE:
    case actionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer; 