import apiClient from '../axiosConfig';

const checkServerStatus = async () => {
  try {
    const response = await apiClient.get('/users');
    console.log('Server is running with users:', response.data.length);
    return response.data.length > 0; 
  } catch (error) {
    console.error('Server connection error:', error);
    return false;
  }
};

const login = async (credentials) => {
  try {
    const { username, password } = credentials;
    
    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
      console.log('Server not running, using mock login for development');
      // mock user for development (testing)
      if (username === 'user' && password === 'password') {
        const mockUser = { id: 1, username: 'user', email: 'user@example.com' };
        const token = btoa(JSON.stringify({ id: mockUser.id, username: mockUser.username }));
        return { user: mockUser, token };
      } else {
        throw new Error('Invalid username or password. For testing, use user/password');
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = await apiClient.get(`/users?username=${username}`);
    const users = response.data;
    
    if (users.length === 0) {
      throw new Error('User not found');
    }
    
    const user = users[0];
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    const token = btoa(JSON.stringify({ id: user.id, username: user.username }));
    
    return {
      user: { id: user.id, username: user.username, email: user.email },
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
};

const register = async (userData) => {
  try {
    // Check if username already exists
    const userCheck = await apiClient.get(`/users?username=${userData.username}`);
    if (userCheck.data.length > 0) {
      throw new Error('Username already exists');
    }
    
    const emailCheck = await apiClient.get(`/users?email=${userData.email}`);
    if (emailCheck.data.length > 0) {
      throw new Error('Email already exists');
    }
    
    const response = await apiClient.post('/users', {
      ...userData,
      id: Date.now(),
    });
    
    const token = btoa(JSON.stringify({ id: response.data.id, username: response.data.username }));
    
    return {
      user: { 
        id: response.data.id, 
        username: response.data.username, 
        email: response.data.email 
      },
      token
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  return { success: true };
};

const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  
  if (!token || !userJson) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { isAuthenticated: false, user: null };
  }
  
  try {
    const user = JSON.parse(userJson);

    const tokenData = JSON.parse(atob(token));
    if (!tokenData || !tokenData.id || tokenData.id !== user.id) {
      throw new Error('Invalid token');
    }
    
    return { isAuthenticated: true, user };
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { isAuthenticated: false, user: null };
  }
}; 

export { login, register, logout, checkAuthStatus };