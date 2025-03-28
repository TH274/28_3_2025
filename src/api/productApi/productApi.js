import apiClient from '../axiosConfig';

const fetchAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

const fetchProducts = async (page = 1, limit = 12) => {
  try {
    const allProducts = await fetchAllProducts();
    
    let filteredProducts = [...allProducts];
    
    const totalCount = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    console.log(`Pagination: Page ${page}, Start: ${startIndex}, End: ${endIndex}, Total: ${totalCount}`);
    console.log("Products on this page:", paginatedProducts.map(p => p.id));
    
    return {
      products: paginatedProducts,
      totalCount,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

const searchProducts = async (query, page = 1, limit = 12) => {
  try {
    const allProducts = await fetchAllProducts();
    
    const searchQuery = query.toLowerCase();
    const matchingProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      (product.description && product.description.toLowerCase().includes(searchQuery))
    );
    
    const totalCount = matchingProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);
    const paginatedProducts = matchingProducts.slice(startIndex, endIndex);
    
    console.log(`Search "${query}" - Page ${page}, Products: ${startIndex}-${endIndex} of ${totalCount}`);
    
    return {
      products: paginatedProducts,
      totalCount,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

const fetchProductsByCategory = async (category, page = 1, limit = 12, filters = {}) => {
  try {
    const allProducts = await fetchAllProducts();
    
    const categoryProducts = allProducts.filter(product => product.category === category);
    
    let filteredProducts = [...categoryProducts];
    
    if (filters.type) {
      filteredProducts = filteredProducts.filter(product => 
        product.type === filters.type
      );
    }
    
    if (filters.size) {
      filteredProducts = filteredProducts.filter(product => 
        product.size === filters.size
      );
    }
    
    if (filters.subtype) {
      filteredProducts = filteredProducts.filter(product => 
        product.subtype === filters.subtype
      );
    }
    
    if (filters.bagType) {
      filteredProducts = filteredProducts.filter(product => 
        product.bagType === filters.bagType
      );
    }
    
    if (filters.sortBy) {
      const order = filters.order || 'asc';
      filteredProducts.sort((a, b) => {
        if (order === 'asc') {
          return a[filters.sortBy] > b[filters.sortBy] ? 1 : -1;
        } else {
          return a[filters.sortBy] < b[filters.sortBy] ? 1 : -1;
        }
      });
    }
    
    const totalCount = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalCount);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    console.log(`Category ${category} - Page ${page}, Products: ${startIndex}-${endIndex} of ${totalCount}`);
    
    return {
      products: paginatedProducts,
      totalCount,
    };
  } catch (error) {
    console.error(`Error fetching products by category ${category}:`, error);
    throw error;
  }
};

export { fetchProducts, fetchProductById, searchProducts, fetchProductsByCategory };