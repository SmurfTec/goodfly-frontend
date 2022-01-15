import React, { useState, useEffect, useMemo } from 'react';

// * ----- MUI STUFF------ //
import { Grid } from '@material-ui/core';
// * ------------ //
import PaginationBar from 'components/common/Pagination';

import ProductCard from './ProductCard';
import ProductsFilters from './ProductsFilters';

const PRODUCTS_PER_PAGE = 12;

const StoreProducts = ({ products, productCategories, searchVal }) => {
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((el) =>
        el.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }, [searchVal]);

  // * Pagination
  const [page, setPage] = React.useState(1);
  const DataCount = useMemo(() => {
    if (!filteredProducts) return;

    // *  total pages  = (total filteredProducts / filteredProducts per page )+ 1
    return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  }, [filteredProducts]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const applyPriceSort = (val) => {
    if (!filteredProducts) return;
    console.log(`val`, val);
    let newProducts = [...products];
    console.log(`filteredProducts`, filteredProducts);
    console.log(
      `((a, b) => a.price - b.price));`,

      filteredProducts.sort((a, b) => {
        return a.price - b.price;
      })
    );
    if (val === 1)
      setFilteredProducts((st) =>
        newProducts.sort((a, b) => a.price - b.price)
      );
    else
      setFilteredProducts((st) =>
        newProducts.sort((a, b) => b.price - a.price)
      );
  };
  // * ------------ *  //

  return (
    <Grid container>
      <ProductsFilters
        productCategories={productCategories}
        setFilteredProducts={setFilteredProducts}
        products={products}
        applyPriceSort={applyPriceSort}
      />
      <Grid item xs={1} sm={1}></Grid>
      <Grid item xs={6} sm={8}>
        <Grid container spacing={4}>
          {filteredProducts
            ?.slice(
              (page - 1) * PRODUCTS_PER_PAGE,
              (page - 1) * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE
            )

            ?.map((product) => (
              <Grid item xs={12} sm={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        {filteredProducts?.length > 0 && (
          <PaginationBar
            page={page}
            count={DataCount}
            onChange={handleChangePage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default StoreProducts;
