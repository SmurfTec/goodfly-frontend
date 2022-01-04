import React, { useState, useEffect, useContext, useMemo } from 'react';

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
import PaginationBar from 'components/common/Pagination';

import useStyles from './styles';
import StoreProducts from './StoreProducts';
import ProductCard from './ProductCard';
import { StoreContext } from 'Contexts/StoreContext';
import Page from 'components/common/Page';
import StoreSubNav from './StoreSubNav';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import { useHistory } from 'react-router-dom';
import SearchBar from 'components/common/Search';

const TOURS_PER_PAGE = 12;

const Index = () => {
  const classes = useStyles();
  const { products, productCategories } = useContext(StoreContext);
  const globalClasses = useGlobalClasses();
  const [searchVal, setSearchVal] = useState('');

  const [filteredProducts, setFilteredProducts] = useState();
  const [priceFilter, setPriceFilter] = useState([0, 1000]);

  const [productSort, setProductSort] = useState(1);
  const [productCategory, setProductCategory] = useState(1);
  const history = useHistory();

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e) => {
    let newVal = e.target.value;
    setSearch(newVal);
    setFilteredProducts(
      products?.filter((el) =>
        el.name.toLowerCase().includes(newVal.toLowerCase())
      )
    );
  };

  const handlePriceSort = (event) => {
    let newProducts = products;
    const newValue = event.target.value * 1;
    setProductSort(newValue);
    // * Sort Price
    newProducts = newProducts.sort((a, b) =>
      a.price >= b.price ? newValue : -newValue
    );
    setFilteredProducts(newProducts);
  };

  const handlePriceCategory = (event) => {
    let newProducts = products;
    console.log(`newProducts`, newProducts);
    setProductCategory(event.target.value);
    // * Make Temp products

    // * Filter by Category
    if (event.target.value !== 'all')
      newProducts = newProducts.filter(
        (product) => product.category._id === event.target.value
      );
    console.log(`newProducts1`, newProducts);

    setFilteredProducts(newProducts);
  };
  const handleSearch = () => {
    console.log(`searchVal`, searchVal);
    history.push(`?q=${searchVal}`);
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

    // * Filter Price by Value
    newProducts = newProducts.filter(
      (product) =>
        product.price >= priceFilter[0] && product.price <= priceFilter[1]
    );

    console.log(`newProducts`, newProducts);
    setFilteredProducts(newProducts);
  };

  // * Pagination
  const [page, setPage] = React.useState(1);
  const DataCount = useMemo(() => {
    if (!filteredProducts) return;

    // *  total pages  = (total filteredProducts / filteredProducts per page )+ 1
    return Math.ceil(filteredProducts.length / TOURS_PER_PAGE);
  }, [filteredProducts]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // * ------------ *  //

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
              <SearchBar
                search={search}
                handleSearchChange={handleSearchChange}
              />
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
                {filteredProducts
                  ?.slice(
                    (page - 1) * TOURS_PER_PAGE,
                    (page - 1) * TOURS_PER_PAGE + TOURS_PER_PAGE
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
          <div className={globalClasses.spaceSection}>
            <Typography variant='h5'>PUB SPACE</Typography>
          </div>
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
