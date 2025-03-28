import apiClient from './axiosConfig';

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('Server request timed out. Please try again.'));
      }
      return Promise.reject(error);
    }
  );
  
  export default interceptors;