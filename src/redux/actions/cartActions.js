import actionTypes from './actionTypes';

export const fetchCart = () => (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_CART_REQUEST });
    
    // Get cart items
    const cartItems = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];
    
    dispatch({
      type: actionTypes.FETCH_CART_SUCCESS,
      payload: cartItems
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_CART_FAILURE,
      payload: error.message
    });
  }
};

// Add item to cart
export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ADD_TO_CART_REQUEST });
    
    const { id, name, price, image, category, size, color, uniqueId } = product;
    
    const item = {
      id: uniqueId || id, // Use uniqueId if same product is added multiple times
      originalId: id, // use to compare with product id
      name,
      price,
      image,
      category,
      size,
      color,
      quantity,
      totalPrice: price * quantity,
    };
    
    dispatch({
      type: actionTypes.ADD_TO_CART_SUCCESS,
      payload: item
    });
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART_FAILURE,
      payload: error.message
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.REMOVE_FROM_CART_REQUEST });
    
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_SUCCESS,
      payload: id
    });
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART_FAILURE,
      payload: error.message
    });
  }
};

// Update cart item (quantity, etc.)
export const updateCartItem = (id, updates) => (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.UPDATE_CART_ITEM_REQUEST });
    
    dispatch({
      type: actionTypes.UPDATE_CART_ITEM_SUCCESS,
      payload: { id, updates }
    });
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.items));
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_CART_ITEM_FAILURE,
      payload: error.message
    });
  }
};

// Clear cart
export const clearCart = () => (dispatch) => {
  try {
    dispatch({ type: actionTypes.CLEAR_CART_REQUEST });
    
    localStorage.removeItem('cartItems');
    
    dispatch({ type: actionTypes.CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionTypes.CLEAR_CART_FAILURE,
      payload: error.message
    });
  }
};

// Toggle shopping bag display
export const toggleCart = (isOpen) => (dispatch) => {
  dispatch({
    type: actionTypes.TOGGLE_CART_DISPLAY,
    payload: isOpen
  });
}; 