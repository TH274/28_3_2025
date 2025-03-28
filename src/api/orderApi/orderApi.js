import apiClient from '../axiosConfig';

const fetchOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const fetchOrderById = async (id) => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

const createOrder = async (orderData) => {
  try {
    const orderWithTimestamp = {
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    
    const response = await apiClient.post('/orders', orderWithTimestamp);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}; 

export {
  fetchOrders,
  fetchOrderById,
  createOrder
}