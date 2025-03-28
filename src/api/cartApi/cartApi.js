import apiClient from '../axiosConfig';

const fetchCart = async () => {
  try {
    const response = await apiClient.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

const addToCart = async (item) => {
  try {
    const cart = await fetchCart();
    const existingItem = cart.find((cartItem) => String(cartItem.id) === String(item.id));
    
    if (existingItem) {
      const updatedItem = { 
        ...existingItem, 
        quantity: existingItem.quantity + (item.quantity || 1),
        totalPrice: (existingItem.quantity + (item.quantity || 1)) * existingItem.price
      };
      const response = await apiClient.put(`/cart/${existingItem.id}`, updatedItem);
      return response.data;
    } else {
      const newItem = { 
        ...item, 
        quantity: item.quantity || 1,
        totalPrice: item.totalPrice || item.price
      };
      const response = await apiClient.post('/cart', newItem);
      return response.data;
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

const updateCartItem = async (id, updates) => {
  try {
    const response = await apiClient.patch(`/cart/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating cart item ${id}:`, error);
    throw error;
  }
};

const removeFromCart = async (id) => {
  try {
    await apiClient.delete(`/cart/${id}`);
    return id;
  } catch (error) {
    console.error(`Error removing item ${id} from cart:`, error);
    throw error;
  }
};

const clearCart = async () => {
  try {
    const cart = await fetchCart();
    const deletePromises = cart.map(item => removeFromCart(item.id));
    await Promise.all(deletePromises);
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}; 

export {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};