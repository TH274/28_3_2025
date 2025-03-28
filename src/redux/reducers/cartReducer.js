import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  isCartOpen: false
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_REQUEST:
    case actionTypes.ADD_TO_CART_REQUEST:
    case actionTypes.UPDATE_CART_ITEM_REQUEST:
    case actionTypes.REMOVE_FROM_CART_REQUEST:
    case actionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case actionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null
      };
      
    case actionTypes.ADD_TO_CART_SUCCESS:
      const existingItem = state.items.find(item => item.id === action.payload.id); // Check item already exists
      
      if (existingItem) {
        // Update quantity if item exists
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id 
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                  totalPrice: (item.quantity + action.payload.quantity) * item.price
                }
              : item
          ),
          loading: false,
          error: null
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, action.payload],
          loading: false,
          error: null,
          isCartOpen: true
        };
      }
      
    case actionTypes.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        ),
        loading: false,
        error: null
      };
      
    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        loading: false,
        error: null
      };
      
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        items: [],
        loading: false,
        error: null
      };
      
    case actionTypes.FETCH_CART_FAILURE:
    case actionTypes.ADD_TO_CART_FAILURE:
    case actionTypes.UPDATE_CART_ITEM_FAILURE:
    case actionTypes.REMOVE_FROM_CART_FAILURE:
    case actionTypes.CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case actionTypes.TOGGLE_CART_DISPLAY:
      return {
        ...state,
        isCartOpen: action.payload
      };
      
    default:
      return state;
  }
};

export default cartReducer; 