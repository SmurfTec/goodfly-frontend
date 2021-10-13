import React from 'react';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import ProductCard from './ProductCard';

const StoreProducts = ({ products, classes }) => {
  return (
    <CarouselLayout>
      {products.map((product) => (
        <div key={product._id} className={classes.carouselCard}>
          <ProductCard product={product} />
        </div>
      ))}
    </CarouselLayout>
  );
};

export default StoreProducts;
