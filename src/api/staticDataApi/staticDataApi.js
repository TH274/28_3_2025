import axios from '../axiosConfig';

// Fetch carousel items
const getCarouselItems = async () => {
  try {
    const response = await axios.get('/carouselItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching carousel items:', error);
    throw error;
  }
};

// Fetch categories
const getCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch filter options
const getFilterOptions = async () => {
  try {
    const response = await axios.get('/filterOptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

// Fetch sort options
const getSortOptions = async () => {
  try {
    const response = await axios.get('/sortOptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching sort options:', error);
    throw error;
  }
}; 

export { getCarouselItems, getCategories, getFilterOptions, getSortOptions };