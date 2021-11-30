import React, { useState, useEffect, useContext } from 'react';

// * ----- MUI STUFF------ //
import {
  Container,
  Grid,
  Typography,
  Slider,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import FlashOnIcon from '@material-ui/icons/FlashOn';
// * ------------ //

import useStyles from './styles';
import StoreProducts from './StoreProducts';
import ProductCard from './ProductCard';
import { StoreContext } from 'Contexts/StoreContext';
import Page from 'components/common/Page';
import StoreSubNav from './StoreSubNav';

const Index = () => {
  const classes = useStyles();
  const { products, productCategories } = useContext(StoreContext);

  const [filteredProducts, setFilteredProducts] = useState();
  const [priceFilter, setPriceFilter] = useState([0, 1000]);

  const [productSort, setProductSort] = useState(1);
  const [productCategory, setProductCategory] = useState(1);

  const handlePriceSort = (event) => {
    setProductSort(event.target.value * 1);
  };

  const handlePriceCategory = (event) => {
    setProductCategory(event.target.value);
  };

  const handlePriceFilterChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const valuetext = (value) => `${value} $`;

  const applyFilter = () => {
    // * Make Temp products
    let newProducts = products;

    // * Filter by Category
    if (productCategory !== 'all')
      newProducts = newProducts.filter(
        (product) => product.category._id === productCategory
      );

    console.log(`newProducts 1`, newProducts);

    // * Filter Price by Value
    newProducts = newProducts.filter(
      (product) =>
        product.price >= priceFilter[0] && product.price <= priceFilter[1]
    );

    // * Sort Price
    newProducts = newProducts.sort((a, b) =>
      a.price >= b.price ? productSort : -productSort
    );

    console.log(`newProducts`, newProducts);
    setFilteredProducts(newProducts);
  };

  return (
    <Page title='GoodFly |  Store'>
      <div>
        <Box className={classes.root}>
          <Box className={classes.mainFeaturedPost}>
            <section className={classes.title}>
              <Typography variant='h3'>
                GOODFLY STORE
                <FlashOnIcon sx={{ marginLeft: 2 }} />
              </Typography>
            </section>
            <section className={classes.description}>
              <Typography variant='h3'>Discover our range</Typography>
              <Typography variant='h3'>Ethical Products</Typography>
            </section>
          </Box>
        </Box>
        <Container>
          <StoreSubNav />

          {products ? (
            <StoreProducts products={products} classes={classes} />
          ) : (
            <div className='loader'></div>
          )}
          <Box marginTop={5}></Box>
          <Grid container>
            <Grid item xs={6} sm={3}>
              <Box>
                <Typography id='range-slider' gutterBottom>
                  Filter by Price
                </Typography>
                <Slider
                  value={priceFilter}
                  onChange={handlePriceFilterChange}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  getAriaValueText={valuetext}
                  min={0}
                  max={1000}
                  step={10}
                  className={classes.PriceSlider}
                />
                <Box
                  display='flex'
                  flexDirection='row'
                  flexWrap='wrap'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography variant='h5' color='textSecondary'>
                    {`${priceFilter[0]}$ - ${priceFilter[1]} $`}
                  </Typography>
                  <Button
                    variant='outlined'
                    className={classes.Input}
                    onClick={applyFilter}
                  >
                    FILTER
                  </Button>
                </Box>
              </Box>
              <Box marginTop={5}>
                <FormControl component='fieldset' className={classes.Input}>
                  <Typography variant='h5'>Sort By Price</Typography>
                  <RadioGroup
                    aria-label='sort'
                    name='sortPrice'
                    value={productSort}
                    onChange={handlePriceSort}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label='Ascending'
                    />
                    <FormControlLabel
                      value={-1}
                      control={<Radio />}
                      label='Descending'
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box marginTop={5}>
                <FormControl component='fieldset' className={classes.Input}>
                  <Typography variant='h5'>Sort By Category</Typography>
                  <RadioGroup
                    aria-label='sort'
                    name='sortCategory'
                    value={productCategory}
                    onChange={handlePriceCategory}
                  >
                    <FormControlLabel
                      value='all'
                      control={<Radio />}
                      label='All'
                    />
                    {productCategories.map((cat) => (
                      <FormControlLabel
                        key={cat._id}
                        value={cat._id}
                        control={<Radio />}
                        label={cat.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={6} sm={8}>
              <Grid container spacing={4}>
                {filteredProducts?.map((product) => (
                  <Grid item xs={12} sm={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Box marginTop={15}></Box>
          <Grid container spacing={4}>
            {products?.slice(0, 4).map((product) => (
              <Grid item xs={6} sm={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Page>
  );
};

export default Index;
