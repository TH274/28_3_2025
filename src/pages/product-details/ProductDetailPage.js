import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchProducts } from '../../redux/actions/productActions';
import { addToCart, toggleCart } from '../../redux/actions/cartActions';
import './ProductDetailPage.css';
import { Button, LoadingSpinner, ProductScroll } from '../../components';

const MAX_RECENT_PRODUCTS = 10;

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.products);
  const { products } = useSelector(state => state.products);
  const [quantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchProducts(1, 50));
        dispatch(fetchProductDetails(id));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.id && products && products.length > 0) {
      const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]');

      const filteredIds = recentlyViewedIds.filter(productId => productId !== product.id);

      const updatedRecentlyViewedIds = [product.id, ...filteredIds].slice(0, MAX_RECENT_PRODUCTS);

      localStorage.setItem('recentlyViewedProducts', JSON.stringify(updatedRecentlyViewedIds));

      const recentProducts = updatedRecentlyViewedIds
        .map(recentId => products.find(p => p.id === recentId))
        .filter(p => p !== undefined);

      setRecentlyViewedProducts(recentProducts);
    }
  }, [product, products]);

  const handleAddToCart = () => {
    if (!product) return;

    const productWithOptions = {
      ...product,
      uniqueId: `${product.id}_${selectedSize}_${selectedColor}`,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    };

    try {
      dispatch(addToCart(productWithOptions, quantity));
      dispatch(toggleCart(true));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getRelatedProducts = () => {
    if (!product || !products || products.length === 0) return [];

    const sameCategory = products.filter(p =>
      p.id !== product.id && p.category === product.category
    );

    if (sameCategory.length >= 4) return sameCategory.slice(0, 8);

    const sameType = products.filter(p =>
      p.id !== product.id &&
      p.type === product.type &&
      p.category !== product.category
    );

    const combined = [...sameCategory, ...sameType];

    if (combined.length < 4) {
      const others = products.filter(p =>
        p.id !== product.id &&
        !sameCategory.some(s => s.id === p.id) &&
        !sameType.some(s => s.id === p.id)
      );

      return [...combined, ...others].slice(0, 8);
    }

    return combined.slice(0, 8);
  };

  const relatedProducts = getRelatedProducts();

  const getRecommendationTitle = () => {
    if (!product) return "OTHERS YOU MAY LIKE";

    if (product.category === "gloves") {
      return "COMPLETE YOUR TRAINING KIT";
    } else if (product.category === "apparel") {
      return "PAIR WITH THESE";
    } else {
      return `MORE ${product.category.toUpperCase()}`;
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger container" style={{ marginTop: '40px' }}>{error}</div>;
  }

  if (!product) {
    return <div className="alert alert-warning container" style={{ marginTop: '40px' }}>Product not found.</div>;
  }

  return (
    <main className="product-detail-page">
      <div className="container">
        <div className="product-detail-container">
          <div className="product-image-container">
            <div className="product-badge">NEW</div>
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">${product.price}</p>

            <div className="product-options">
              <div className="option-section">
                <h3 className="option-title">Colour:</h3>
                <div className="color-options">
                  <div
                    className={`color-option black ${selectedColor === 'Black' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('Black')}
                  >
                  </div>
                  <div
                    className={`color-option beige ${selectedColor === 'Beige' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('Beige')}
                  >
                  </div>
                </div>
              </div>

              <div className="option-section">
                <h3 className="option-title">Size:</h3>
                <div className="size-options">
                  {(product.size ? [product.size] :
                    product.sizes && product.sizes.length > 0 ? product.sizes :
                      product.category === 'gloves' ?
                        ['8oz', '10oz', '12oz', '14oz', '16oz'] :
                        ['S', 'M', 'L', 'XL', '2XL', '3XL']
                  ).map((size) => (
                    <div
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-actions">
              <Button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                icon={<span className="cart-icon">🛒</span>}
              >
                ADD TO BAG
              </Button>

              <Button
                className="add-to-wishlist-button"
                outline
                icon={<span className="wishlist-icon">♡</span>}
              >
                SAVE TO WISHLIST
              </Button>
            </div>

            <div className="shipping-info">
              <div className="info-item">
                <span>Free shipping on orders over $100 excluding bulky/heavy items.</span>
              </div>
              <div className="info-item">
                <span>30 day returns on all orders</span>
              </div>
            </div>

            <div className="product-description">
              <h3>DESCRIPTION</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        <section className="category-section">
          <div className="container">
            <div className="related-products-header">
              <ProductScroll
                title={getRecommendationTitle()}
                products={relatedProducts}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </section>

        {recentlyViewedProducts.length > 0 && (
          <section className="category-section recently-viewed-section">
            <div className="container">
              <ProductScroll
                title="RECENTLY VIEWED"
                products={recentlyViewedProducts}
                loading={false}
                error={null}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage; 