import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

const HeroCarousel = ({ carouselItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % carouselItems.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, carouselItems.length]);

  useEffect(() => {
    const slideSize = 100 / carouselItems.length;
    
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${-currentSlide * slideSize}%)`;
    }
  }, [currentSlide, carouselItems.length]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 3;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  }

  const handleMouseUp = () => {
    isDragging.current = false;
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
    const slideSize = 100 / carouselItems.length;
    const position = -slideIndex * slideSize;
    
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(${position}%)`;
    }
  };

  return (
    <section className="hero-section">
      <div 
        className="hero-carousel" 
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: `${carouselItems.length * 100}%` }}
      >
        {carouselItems.map((item, index) => (
          <div 
            key={index} 
            className="hero-carousel-item" 
            style={{ 
              backgroundImage: `url(${item.image})`,
              flexBasis: `${100 / carouselItems.length}%`
            }}
          >
          </div>
        ))}
      </div>

      {carouselItems.length > 0 && (
        <div className="hero-content-container">
          <Link to={carouselItems[currentSlide].buttonLink} className="hero-content">
            <h1>{carouselItems[currentSlide].title}</h1>
            <p>{carouselItems[currentSlide].description}</p>
          </Link>
        </div>
      )}

      <div className="carousel-indicators">
        {carouselItems.map((_, index) => (
          <div 
            key={index}
            className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel; 