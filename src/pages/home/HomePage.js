import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingSpinner, HeroCarousel, ProductScroll } from '../../components';
import { fetchProducts } from '../../redux/actions/productActions';
import { getCarouselItems, getCategories } from '../../api/staticDataApi/staticDataApi';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [carouselItems, setCarouselItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  const closeMobileMenu = () => {
    const header = document.querySelector('.navigation');
    if (header && header.classList.contains('active')) {
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      if (mobileMenuToggle) {
        mobileMenuToggle.click();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [carouselData, categoriesData] = await Promise.all([
          getCarouselItems(),
          getCategories()
        ]);
        setCarouselItems(carouselData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching static data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
    dispatch(fetchProducts(1, 50));
  }, [dispatch]);

  if (dataLoading) {
    return <LoadingSpinner />;
  }

  const newProducts = products.slice(0, 10);
  
  const bestSellers = products.slice(10, 20);

  return (
    <main>
      <HeroCarousel carouselItems={carouselItems} />

      <section className="category-section">
        <div className="container">
          <ProductScroll
            title="NEW IN: TIM TSZYU MERCH"
            products={newProducts}
            loading={loading}
            error={error}
          />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="category-container">
            {categories.length > 0 && categories.slice(0, 3).map(category => (
              <div className="category-card" key={category.id}>
                <img src={category.image} alt={category.name} />
                <div className="overlay">
                  <h3>{category.name}</h3>
                  <Link to={`/category/${category.slug}`} className="btn" onClick={closeMobileMenu}>SHOP NOW</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {categories.length > 3 && (
        <>
          <section className="full-width-category-section">
            <div className="container">
              <div className="large-category-card">
                <img src={categories[3].image} alt={categories[3].name} />
                <div className="large-overlay">
                  <h2>{categories[3].name}</h2>
                  <Link to={`/category/${categories[3].slug}`} className="btn" onClick={closeMobileMenu}>SHOP NOW</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="full-width-category-section">
            <div className="container">
              <div className="large-category-card">
                <img src={categories[4].image} alt={categories[4].name} />
                <div className="large-overlay">
                  <h2>{categories[4].name}</h2>
                  <Link to={`/category/${categories[4].slug}`} className="btn" onClick={closeMobileMenu}>SHOP NOW</Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="category-section">
        <div className="container">
          <ProductScroll
            title="BEST SELLERS"
            products={bestSellers}
            loading={loading}
            error={error}
          />
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/products" className="btn btn-outline" onClick={closeMobileMenu}>View All Products</Link>
      </div>
    </main>
  );
};

export default HomePage; 